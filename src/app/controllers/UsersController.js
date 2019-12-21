import User from '../models/User';

// Yup validator
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    // Validation schema
    const UserSchema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      birthdate: Yup.date().required(),
      user_type: Yup.number().required()
    });

    if (!(await UserSchema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'All information is necessary to create an account' });
    }

    try {
      // Looking for user where the email is equal to email from req.body
      const userExists = await User.findOne({
        where: { email: req.body.email }
      });

      // Check if user exists
      if (userExists) {
        return res
          .status(400)
          .json({ message: 'This email is already in use' });
      }

      // Creating new user
      await User.create(req.body);

      // Returning the success message
      return res.json({ message: 'User registered successfully', status: 200 });
    } catch (error) {
      // Returning the exception error
      return res.json({ message: error.errors[0].message, status: 400 });
    }
  }

  async update(req, res) {
    const { email, currentPassword, userId } = req.body;

    // return res.json(req.body);

    // Validation schema
    const UserSchema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      currentPassword: Yup.string().min(6),

      password: Yup.string()
        .min(6)
        .when('currentPassword', (currentPassword, field) =>
          currentPassword ? field.required() : field
        ),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    });

    // Verifying if all data is correctly inserted
    if (!(await UserSchema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Insert all data correctly please' });
    }

    // Finding the user by userId that iside the JWT token
    const user = await User.findByPk(userId);

    // Verfifying if the user wants to change the current email
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'This email is already in use' });
      }
    }

    // Verfying if the user wants to change his password
    if (currentPassword && !(await user.checkPassword(currentPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    try {
      await user.update(req.body);
      return res.status(200).json({ success: 'User updated successfully' });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async delete(req, res) {
    const { userId } = req.body;

    if (!userId)
      return res.status(400).json({ error: `The user wasn't informed` });

    const user = User.findByPk(userId);

    if (!user)
      return res
        .status(401)
        .json({ error: `The user with this user ID doesn't exists` });

    try {
      const { is_active } = user;
      return res.json(is_active);
      // await User.update();
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}

export default new UserController();
