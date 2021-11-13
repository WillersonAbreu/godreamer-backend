// Services
import UserInfoDonationService from '../services/UserInfoDonationService'

class UserInfoDonationController {
  async index(req, res) {
    try {
      const infoDonation = await UserInfoDonationService.findById(req, res)

      return res.status(200).json({ status: 200, donationInfos: infoDonation })
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async store(req, res) {
    try {
      await UserInfoDonationService.store(req, res)
      return res.status(201).json({
        status: 201,
        message: 'Your donation info was registered successfully',
      })
    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message })
    }
  }

  async update(req, res) {
    try {
      await UserInfoDonationService.update(req, res)
      return res.status(200).json({
        status: 200,
        message: 'Your donation info was updated successfully',
      })
    } catch (err) {
      return res.status(400).json(err.message)
    }
  }

  async delete(req, res) {
    try {
      await UserInfoDonationService.delete(req, res)
      return res
        .status(204)
        .json({ status: 204, message: 'Donation info deleted successfully' })
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

export default new UserInfoDonationController()
