"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

// Models
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _ProfileImage = require('../models/ProfileImage'); var _ProfileImage2 = _interopRequireDefault(_ProfileImage);
var _Friendship = require('../models/Friendship'); var _Friendship2 = _interopRequireDefault(_Friendship);
var _Post = require('../models/Post'); var _Post2 = _interopRequireDefault(_Post);

// Yup validator
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);
var _UserInfoDonation = require('../models/UserInfoDonation'); var _UserInfoDonation2 = _interopRequireDefault(_UserInfoDonation);

class UserController {
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({
        where: { is_active: true },
        attributes: {
          exclude: [
            'password',
            'is_active',
            'createdAt',
            'updatedAt',
            'profile_image_id',
          ],
        },
        include: [
          {
            model: _ProfileImage2.default,
            attributes: {
              exclude: ['user_id', 'is_active', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: _Friendship2.default,
          },
          {
            model: _Group2.default,
          },
        ],
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async store(req, res) {
    // Validation schema
    const UserSchema = Yup.object({
      name: Yup.string().required('Is necessary insert an user name').min(3),
      email: Yup.string().email().required('Insert an valid email'),
      password: Yup.string().required('Is necessary insert an password').min(6),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required('The password confirmation does not match')
              .oneOf([Yup.ref('password')])
          : field
      ),
      birthdate: Yup.date().required('The user birthdate is necessary'),
      user_type: Yup.number().required('The user type is necessary'),
    });

    try {
      await UserSchema.validate(req.body);
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    try {
      // Looking for user where the email is equal to email from req.body
      const userExists = await _User2.default.findOne({
        where: { email: req.body.email },
      });

      // Check if user exists
      if (userExists) {
        return res
          .status(400)
          .json({ message: 'This email is already in use' });
      }

      // Creating new user
      await _User2.default.create(req.body);

      // Returning the success message
      return res.json({ message: 'User registered successfully', status: 200 });
    } catch (error) {
      // Returning the exception error
      return res.json({ message: error.errors[0].message, status: 400 });
    }
  }

  async update(req, res) {
    const { email, currentPassword, userId } = req.body;

    // Validation schema
    const UserSchema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),

      password: Yup.string(),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      currentPassword: Yup.string().when('password', (currentPassword, field) =>
        currentPassword ? field.required() : field
      ),
    });

    // Verifying if all data is correctly inserted
    try {
      await UserSchema.validate(req.body);
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    // Finding the user by userId that iside the JWT token
    let user = await _User2.default.findByPk(userId);

    // Verfifying if the user wants to change the current email
    if (email !== user.email) {
      const userExists = await _User2.default.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Este email já está em uso' });
      }
    }

    // Verfying if the user wants to change his password
    if (currentPassword && !(await user.checkPassword(currentPassword))) {
      return res
        .status(401)
        .json({ error: 'É necessário inserir a senha correta para alterá-la' });
    }

    const data = {
      name: req.body.name.length > 0 ? req.body.name : user.toJSON().name,
      email: req.body.email.length > 0 ? req.body.email : user.toJSON().email,
      password:
        req.body.password.length > 0
          ? req.body.password
          : user.toJSON().password,
      passwordConfirmation:
        req.body.passwordConfirmation.length > 0
          ? req.body.passwordConfirmation
          : user.toJSON().password,
      birthdate:
        req.body.birthdate.length > 0
          ? req.body.birthdate
          : user.toJSON().birthdate,
      user_type:
        req.body.user_type.length > 0
          ? req.body.user_type
          : user.toJSON().user_type,
      about_user:
        req.body.about_user.length > 0
          ? req.body.about_user
          : user.toJSON().about_user,
    };

    try {
      await user.update(data);
      return res
        .status(200)
        .json({ success: 'Usuário atualizado com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async delete(req, res) {
    const { userId } = req.body;

    if (!userId)
      return res.status(400).json({ error: `The user wasn't informed` });

    const user = await _User2.default.findByPk(userId);

    if (!user)
      return res
        .status(401)
        .json({ error: `The user with this user ID doesn't exists` });

    try {
      await user.update({ is_active: false });
      return res
        .status(200)
        .json({ message: 'The user was deleted successfully' });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  async getUserByEmailOrName(req, res) {
    const { emailOrName } = req.params;
    // Email Schema
    const emailSchema = Yup.object().shape({
      emailOrName: Yup.string().email(),
    });

    // Check if the URL param is name or email
    if (await emailSchema.isValid(req.params)) {
      // return res.json({ isemail: true });
      try {
        const user = await _User2.default.findOne({
          where: { email: emailOrName },
          attributes: { exclude: ['password'] },
          include: [{ model: _ProfileImage2.default }, { model: _UserInfoDonation2.default }],
        });

        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }

    // Else find by user name
    try {
      const Operator = _sequelize2.default.Op;

      const users = await _User2.default.findAll({
        where: {
          name: emailOrName /*{ [Operator.like]: `%${emailOrName}%` }*/,
        },
        // attributes: { exclude: ['password'] },
        include: [{ model: _ProfileImage2.default }, { model: _UserInfoDonation2.default }],
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUsersByLikeEmailOrName(req, res) {
    const { emailOrName } = req.params;
    // Email Schema
    const emailSchema = Yup.object().shape({
      emailOrName: Yup.string().email(),
    });

    // Check if the URL param is name or email
    if (await emailSchema.isValid(req.params)) {
      // return res.json({ isemail: true });
      try {
        const user = await _User2.default.findAll({
          where: { email: emailOrName },
          attributes: { exclude: ['password'] },
          include: [{ model: _ProfileImage2.default }, { model: _UserInfoDonation2.default }],
        });

        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }

    // Else find by user name
    try {
      const Operator = _sequelize2.default.Op;

      const users = await _User2.default.findAll({
        where: {
          name: { [Operator.like]: `%${emailOrName}%` },
        },
        // attributes: { exclude: ['password'] },
        include: [{ model: _ProfileImage2.default }, { model: _UserInfoDonation2.default }],
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

exports. default = new UserController();
