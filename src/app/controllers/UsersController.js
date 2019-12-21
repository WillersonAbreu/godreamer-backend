import User from '../models/User';

// Yup validator
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    // Validation schema
    const UserSchema = Yup.object({
      name: Yup.string().required('The name of the user is required'),
      email: Yup.string()
        .email()
        .required('The email is required'),
      password: Yup.string().required('The password is required'),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      birthdate: Yup.date().required('The birthdate is required'),
      user_type: Yup.number().required('The user type is required')
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
    const { email, currentPassword } = req.body;

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

    if (!(await UserSchema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Insert all data correctly please' });
    }

    const user = await User.findByPk(req.body.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'This email is already in use' });
      }
    }

    if (currentPassword && !(await user.checkPassword(currentPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    try {
      await user.update(req.body);
      return res.status(200).json({ success: 'User updated successfully' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
