// Models
import { response } from 'express'
// Yup validator
import * as Yup from 'yup'
import User from '../../models/User'
// Users Service
import UsersService from '../../services/UsersService'

class UsersValidator {
  // Create user validation schema
  CreateUserSchema = Yup.object({
    name: Yup.string().required('Is necessary insert an user name').min(3),
    email: Yup.string().email().required('Insert a valid email'),
    password: Yup.string().required('Is necessary insert a password').min(6),
    birthdate: Yup.date().required('The user birthdate is necessary'),
    user_type: Yup.number().required('The user type is necessary'),
  })

  // Update user validation schema
  UpdateUserSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    password: Yup.string(),
    currentPassword: Yup.string().when('password', (currentPassword, field) =>
      currentPassword ? field.required() : field,
    ),
  })

  EmailSchema = Yup.object().shape({
    emailOrName: Yup.string().email(),
  })

  async isEmailOrNameValidate(params) {
    return await this.EmailSchema.isValid(params)
  }

  /**
   *
   * @param {User} user
   * @returns {Boolean} isValid
   */
  async createUserValidate(userData, res) {
    await this.CreateUserSchema.validate(userData)
    await this.isEmailUsed(userData.email, res)
  }

  async updateUserValidate(userData, res) {
    const user = await UsersService.findUserByPk(userData.userId)

    await this.UpdateUserSchema.validate(userData)

    if (userData.email !== user.email) {
      await this.isEmailUsed(userData.email, res)
    }

    if (await this.willUpdatePassword(userData, user)) {
      return res.status(403).json({
        message:
          'Is necessary insert current password correctly to update this account!',
      })
    }

    response = {
      data: await this.buildUserUpdateData(userData, user),
      userModel: user,
    }

    return response
  }

  async willUpdatePassword(userData, currentUser) {
    if (
      userData.password &&
      !(await currentUser.checkPassword(userData.currentPassword))
    ) {
      return true
    } else {
      return false
    }
  }

  async isEmailUsed(email, res) {
    // Looking for user where the email is equal to email from req.body
    const userExists = await User.findOne({
      where: { email: email },
    })

    // Check if user exists
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'This email is already in use', status: 400 })
    }
  }

  async buildUserUpdateData(userData, currentUser) {
    var name
    var email
    var password
    var birthdate
    var user_type
    var about_user

    if (userData.name && userData.name.length > 0) {
      name = userData.name
    } else {
      name = currentUser.name
    }

    if (userData.email && userData.email.length > 0) {
      email = userData.email
    } else {
      email = currentUser.toJSON().email
    }

    if (userData.password && userData.password.length > 0) {
      password = userData.password
    } else {
      password = currentUser.toJSON().password
    }

    if (userData.birthdate && userData.birthdate.length > 0) {
      birthdate = userData.birthdate
    } else {
      birthdate = currentUser.toJSON().birthdate
    }

    if (userData.user_type && userData.user_type.length > 0) {
      user_type = userData.user_type
    } else {
      user_type = currentUser.toJSON().user_type
    }

    if (userData.about_user && userData.about_user.length > 0) {
      about_user = userData.about_user
    } else {
      about_user = currentUser.toJSON().about_user
    }

    let data = {
      name,
      email,
      password,
      birthdate,
      user_type,
      about_user,
    }

    return data
  }
}

export default new UsersValidator()
