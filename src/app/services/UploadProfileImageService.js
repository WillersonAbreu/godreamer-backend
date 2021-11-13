// Models
import ProfileImage from '../models/ProfileImage'

// Services
import UsersService from './UsersService'

// Utils
import UploadProfileImageValidator from '../utils/validator/UploadProfileImageValidator'
import UploadProfileImageServiceUtils from '../utils/services/UploadProfileImageServiceUtils'

class UploadProfileImageService {
  /**
   *
   * @param {userId} profileImageId
   * @param {Response} res
   * @description Return a static file from profile
   * @returns {File} profileImage
   */
  async findById(profileImageId, res) {
    if (!profileImageId)
      return res
        .status(400)
        .json({ status: 400, error: 'Is necessary insert the ID' })

    const file = await ProfileImage.findByPk(profileImageId)

    if (!file)
      return res
        .status(404)
        .json({ status: 404, error: 'The profile image was not found' })

    return file
  }

  /**
   * @description Store the profile image from a specific user
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} response
   */
  async store(req, res) {
    const profileImageFile = req.file

    const { originalname: name, filename: image_source } = profileImageFile

    const { userId } = req.params

    UploadProfileImageValidator.isProfileImagePresent(profileImageFile, res)

    return await ProfileImage.create({
      id: userId,
      name,
      image_source,
    })
  }

  /**
   * @description Update the profile image from a specific user
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} response
   */
  async update(req, res) {
    const profileImageFile = req.file

    const { originalname: name, filename: image_source } = profileImageFile

    const { userId } = req.params

    const profileImage = await this.findById(userId)

    UploadProfileImageValidator.isProfileImagePresent(profileImageFile, res)

    await UploadProfileImageServiceUtils.deleteImageFileFromDisk(profileImage)

    return await profileImage.update({
      id: userId,
      name,
      image_source,
    })
  }

  /**
   * @description Delete an profile image from a specific user
   * @param {Number} profileImageId
   */
  async delete(profileImageId, res) {
    const profileImage = await this.findById(profileImageId, res)

    UploadProfileImageValidator.isProfileImagePresent(profileImage, res)

    await profileImage.update({ is_active: false })
  }
}

export default new UploadProfileImageService()
