import User from '../models/User';

// Yup validator
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    // Validation schema
    const UserSchema = Yup.object({
      name: Yup.string().required('The name of the user is required!'),
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
        res.status(400).json({ message: 'This email is already in use!' });
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

  async update(req, res) {}
}

export default new UserController();
