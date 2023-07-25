// Models
import UserInfoDonation from '../models/UserInfoDonation'

class UserInfoDonationUtils {
  /**
   * @description Check if the user has donation info already
   * @param {Number} userId
   * @returns {Boolean}
   */
  hasDonationInfo(userId) {
    const checkinfoDonation = await UserInfoDonation.findAll({
      where: { userId },
    })
    return checkinfoDonation !== null || checkinfoDonation !== undefined
  }
}

export default UserInfoDonationUtils()
