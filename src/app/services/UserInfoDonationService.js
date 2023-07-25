// Models
import UserInfoDonation from '../models/UserInfoDonation'
import UserInfoDonationServiceUtils from '../utils/services/UserInfoDonationServiceUtils'

class UserInfoDonationService {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @description Return a data for donations of a specific user
   * @returns {UserInfoDonation} userInfoDonation
   */
  async findById(req, res) {
    const { userId } = req.body

    if (!userId)
      return res
        .status(400)
        .json({ status: 400, error: 'Is necessary insert the user ID' })

    return await UserInfoDonation.findByPk({
      where: { userId },
    })
  }

  /**
   * @description Store the data for donations of a specific user
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} response
   */
  async store(req, res) {
    const request, { userId } = req.body

    if (await !UserInfoDonationServiceUtils.hasDonationInfo(userId)) {
      return await UserInfoDonation.create(request)
    } else {
      return res.status(400).json({
        error: "Can't create another donation info for the same user",
      })
    }
  }

  /**
   * @description Update the data for donations of a specific user
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} response
   */
  async update(req, res) {
    const request, { userId } = req.body

    if (await UserInfoDonationServiceUtils.hasDonationInfo(userId)) {
      const userInfoDonation = await this.findById(userId);
      return await userInfoDonation.update(request)
    } else {
      return res.status(400).json({
        error: "Can't find any donation info, please register a donation info before",
      })
    }
  }

  /**
   * @description Delete the data for donations of a specific user
   * @param {Number} userId
   */
  async delete(userId, res) {
    const { userId } = req.body

    if (await UserInfoDonationServiceUtils.hasDonationInfo(userId)) {
      const userInfoDonation = await this.findById(userId);
      return await userInfoDonation.destroy()
    } else {
      return res.status(400).json({
        error: "Can't find any donation info, please register a donation info before",
      })
    }
  }
}

export default UserInfoDonationService()
