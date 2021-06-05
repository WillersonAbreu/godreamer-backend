// Models
import User from '../../models/User';

// Yup validator
import * as Yup from 'yup';

class UsersValidator {  

  // Validation schema
  CreateUserSchema = Yup.object({
    name: Yup.string().required('Is necessary insert an user name').min(3),
    email: Yup.string().email().required('Insert a valid email'),
    password: Yup.string().required('Is necessary insert a password').min(6),
    birthdate: Yup.date().required('The user birthdate is necessary'),
    user_type: Yup.number().required('The user type is necessary'),
  });

  /**
   * 
   * @param {User} user 
   * @returns {Boolean} isValid
   */
  async createUserValidate(userData) {
    await this.CreateUserSchema.validate(userData);
  }

  async isEmailUsed(email, res) {
    // Looking for user where the email is equal to email from req.body
    const userExists = await User.findOne({
      where: { email: email },
    });

    // Check if user exists
    if (userExists) {
      console.log(res);
      return res.status(400).json({ message: "This email is already in use" });
    }
  }
}

export default new UsersValidator();