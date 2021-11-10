import ProfileImage from '../models/ProfileImage'
import User from '../models/User'

// Services
import UploadProfileImageService from '../services/UploadProfileImageService'

class UploadProfileImageController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {File} profileImage
   */
  async index(req, res) {
    try {
      const { userId } = req.params
      let profileImage = await UploadProfileImageService.findById(userId, res)
      return res.status(200).json({ status: 200, message: profileImage })
    } catch (error) {
      return res.status(400).json({ status: 400, error: error.message })
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} response
   */
  async store(req, res) {
    try {
      await UploadProfileImageService.store(req, res)
      return res
        .status(201)
        .json({ message: 'Profile image registered successfully', status: 201 })
    } catch (error) {
      return res.status(400).json({ status: 400, error: error.message })
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} response
   */
  async update(req, res) {
    try {
      await UploadProfileImageService.update(req, res)
      return res
        .status(201)
        .json({ message: 'Profile image updated successfully', status: 200 })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} response
   */
  async delete(req, res) {
    try {
      await UploadProfileImageService.delete(req.params.userId, res)

      return res
        .status(200)
        .json({
          message: 'The profile image was deleted successfully',
          status: 200,
        })
    } catch (error) {
      return res.status(400).error({ error: error.message })
    }
  }
}

export default new UploadProfileImageController()
