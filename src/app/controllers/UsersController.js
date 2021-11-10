// Models
import User from '../models/User'

// Yup validator
import * as Yup from 'yup'

// Services
import UsersService from '../services/UsersService'
class UserController {
  /**
   * @description Return all users
   * @param {Request} req
   * @param {Response} res
   * @returns {Array.from(User)}
   */
  async index(req, res) {
    try {
      const users = await UsersService.findAllUsers()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(400).json({ error: error.message })
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
      await UsersService.store(req.body, res)
      return res
        .status(201)
        .json({ message: 'User registered successfully', status: 201 })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return res.json({ message: error.message, status: 400 })
      } else {
        return res.json({ message: error.message, status: 500 })
      }
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async update(req, res) {
    try {
      await UsersService.update(req.body, res)
      return res.status(200).json({ success: 'User updated successfully' })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    const { userId } = req.body
    try {
      await UsersService.delete(userId, res)
      return res
        .status(200)
        .json({ message: 'The user was deleted successfully' })
    } catch (error) {
      return res.json({ error: error.message })
    }
  }

  async getUsersByLikeEmailOrName(req, res) {
    try {
      await UsersService.getUsersByLikeEmailOrName(req.params, res)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export default new UserController()
