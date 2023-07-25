import jwt from 'jsonwebtoken'
import { promisify } from 'util'

// Models
import UserInfoDonation from '../models/UserInfoDonation'
import Donation from '../models/Donation'

class DonationController {
  async index(req, res) {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )
      const user_id = decodedToken.id

      const donations = await Donation.findAll({
        where: { user_id },
      })

      if (donations.length == 0)
        return res
          .status(404)
          .json({ error: 'You have not donated to anyone yet.' })

      return res.status(200).json({ donations: donations })
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  async store(req, res) {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )

      const user_id = decodedToken.id

      const target_id = parseInt(req.params.targetId)
      const { information, ammount } = req.body

      if (user_id == target_id)
        return res.status(401).json({ error: 'You cannot donate to yourself' })

      let infoDonation = await UserInfoDonation.findOne({
        where: { user_id: target_id },
      })

      if (infoDonation == null)
        return res
          .status(404)
          .json({ error: "Couldn't find an info donation for this user" })

      const donation = await Donation.create({
        ammount,
        information,
        user_id,
        target_id,
      })

      return res.status(200).json(donation)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )

      const user_id = decodedToken.id
      const donation_id = parseInt(req.params.donationId)
      const { information, ammount } = req.body

      const donation = await Donation.findByPk(donation_id)

      if (donation == null)
        return res.status(400).json({ error: 'Donation not found.' })

      if (donation.user_id != user_id)
        return res
          .status(401)
          .json({ error: 'You are not authorized to update this donation.' })

      await donation.update({
        information,
        ammount,
      })

      return res.status(200).json({ message: 'Donation updated successfully' })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )

      const user_id = decodedToken.id

      const donation_id = parseInt(req.params.donationId)

      const donation = await Donation.findByPk(donation_id)

      if (donation == null)
        return res.status(400).json({ error: 'Donation not found.' })

      if (donation.user_id != user_id)
        return res
          .status(401)
          .json({ error: 'You are not authorized to delete this donation.' })

      await donation.destroy()

      return res.status(200).json({ message: 'Donation deleted successfully' })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new DonationController()
