import Sequelize from 'sequelize';

// Models
import User from '../models/User';
import ProfileImage from '../models/ProfileImage';
import Friendship from '../models/Friendship';
import Post from '../models/Post';

// Yup validator
import * as Yup from 'yup';
import Group from '../models/Group';
import UserInfoDonation from '../models/UserInfoDonation';

// Services
import UsersService from '../services/UsersService';

class UserController {
  /**
   * @description Return all users
   * @param {Request} req 
   * @param {Response} res 
   * @returns {Array.from(User)}
   */
  async index(req, res) {
    try {
      const users = await UsersService.findAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * @description Create an user
   * @param {Request} req 
   * @param {Response} res 
   * @returns {User}
   */
  async store(req, res) {
    try {
      await UsersService.store(req.body, res);
      return res.json({ message: 'User registered successfully', status: 200 });
    } catch (error) {
      if(error instanceof Yup.ValidationError){
         return res.json({ message: error.message, status: 400 });
      }else{
        return res.json({ message: error.message, status: 500 });
      }
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
    let user = await User.findByPk(userId);

    // Verfifying if the user wants to change the current email
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

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

    const user = await User.findByPk(userId);

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
        const user = await User.findOne({
          where: { email: emailOrName },
          attributes: { exclude: ['password'] },
          include: [{ model: ProfileImage }, { model: UserInfoDonation }],
        });

        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }

    // Else find by user name
    try {
      const Operator = Sequelize.Op;

      const users = await User.findAll({
        where: {
          name: emailOrName /*{ [Operator.like]: `%${emailOrName}%` }*/,
        },
        // attributes: { exclude: ['password'] },
        include: [{ model: ProfileImage }, { model: UserInfoDonation }],
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
        const user = await User.findAll({
          where: { email: emailOrName },
          attributes: { exclude: ['password'] },
          include: [{ model: ProfileImage }, { model: UserInfoDonation }],
        });

        return res.status(200).json(user);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }

    // Else find by user name
    try {
      const Operator = Sequelize.Op;

      const users = await User.findAll({
        where: {
          name: { [Operator.like]: `%${emailOrName}%` },
        },
        // attributes: { exclude: ['password'] },
        include: [{ model: ProfileImage }, { model: UserInfoDonation }],
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
