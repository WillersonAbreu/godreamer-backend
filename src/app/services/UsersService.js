import Sequelize, { Op, where } from 'sequelize'

// Models
import User from '../models/User'

// Utils
import {
  findUserWhereClause,
  excludedUserAttributesFromFindQueries,
  includedUserAttributesFromFindQueries,
} from '../utils/services/UsersServiceUtils'

// Validator
import UserValidator from '../utils/validator/UsersValidator'
class UsersService {
  /**
   * @description
   * @returns
   */
  async findAllUsers() {
    return await User.findAll({
      where: findUserWhereClause,
      attributes: {
        exclude: excludedUserAttributesFromFindQueries,
      },
      include: includedUserAttributesFromFindQueries,
    })
  }

  /**
   * @description Create an user
   */
  async store(userData, res) {
    await UserValidator.createUserValidate(userData, res)
    const user = await User.create(userData)
    return user
  }

  /**
   * @description Create an user
   */
  async update(userData, res) {
    const { data, userModel } = await UserValidator.updateUserValidate(
      userData,
      res,
    )
    await userModel.update(data)
    return res.status(204).json({ success: 'User updated successfully' })
  }

  /**
   * @description Delete an user
   */
  async delete(userId, res) {
    if (userId) {
    }
  }

  /**
   * @description Find user by Primary Key
   * @param {User} userData
   * @param {Response} res
   * @returns
   */
  async findUserByPk(userId) {
    return await User.findByPk(userId)
  }

  /**
   * @description Create an user
   */
  async getUserByEmailOrName(userData, res) {
    await UserValidator.createUserValidate(userData, res)
    const user = await User.create(userData)
    return user
  }

  /**
   * @description Create an user
   */
  async getUsersByLikeEmailOrName(userData, res) {
    await UserValidator.createUserValidate(userData, res)
    const user = await User.create(userData)
    return user
  }
}

export default new UsersService()
