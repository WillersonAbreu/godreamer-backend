// Models
import User from '../models/User'

// Utils
import UsersServiceUtils, {
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
   * @description Update an user
   */
  async update(userData, res) {
    const { data, userModel } = await UserValidator.updateUserValidate(
      userData,
      res,
    )
    return await userModel.update(data)
  }

  /**
   * @description Delete an user
   */
  async delete(userId, res) {
    if (!userId)
      return res.status(400).json({ error: `The user wasn't informed` })

    const user = await User.findByPk(userId)

    if (!user)
      return res
        .status(401)
        .json({ error: `The user with this user ID doesn't exists` })

    await user.update({ is_active: false })
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
   * @description Find user by user email or name
   */
  async getUserByEmailOrName(params, res) {
    // Else find by user name
    try {
      const {
        byEmailSearch,
        byNameSearch,
      } = await UsersServiceUtils.buildGetUserByEmailOrName(params.emailOrName)

      if (await UserValidator.isEmailOrNameValidate(params)) {
        const user = await User.findOne(byEmailSearch)
        return res.status(200).json(user)
      } else {
        const users = await User.findAll(byNameSearch)
        return res.status(200).json(users)
      }
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  /**
   * @description Create an user
   */
  async getUsersByLikeEmailOrName(userData, res) {
    const { emailOrName } = userData

    try {
      let condition = await UsersServiceUtils.buildGetUserByLikeEmailOrName(
        emailOrName,
      )

      // Check if the URL param is not undefined
      if (emailOrName) {
        const user = await User.findAll(condition)
        return res.status(200).json(user)
      } else {
        return res.status(400).json(users)
      }
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export default new UsersService()
