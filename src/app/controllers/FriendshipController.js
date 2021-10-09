import jwt from 'jsonwebtoken'
import { promisify } from 'util'

// Models
import Friendship from '../models/Friendship'
import FriendshipBO from '../BO/FriendshipBO'
import ChatConversation from '../models/ChatConversation'

class FriendshipController {
  async index(req, res) {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )

      const user_id = decodedToken.id

      const friends = await FriendshipBO.getFriends(user_id)
      return res.status(200).json({ friends })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async store(req, res) {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )
      const { id_user } = req.body
      const user_id = decodedToken.id

      const loggedUserData = {
        user_id,
        id_user,
        is_active: true,
      }
      const friendUserData = {
        user_id: id_user,
        id_user: user_id,
      }

      const isFriend = await Friendship.findAll({
        where: { user_id: user_id, id_user: id_user },
      })

      const isFriendConfirm = await Friendship.findAll({
        where: { user_id: id_user, id_user: user_id },
      })

      if (isFriend[0] && isFriendConfirm[0]) {
        if (isFriend[0].id + 1 === isFriendConfirm[0].id) {
          return res.status(400).json({ error: 'Vocês já são amigos' })
        }
      }

      await Friendship.create(loggedUserData)
      await Friendship.create(friendUserData)

      await ChatConversation.create({
        user_id,
        id_user,
      })

      await ChatConversation.create({
        user_id: id_user,
        id_user: user_id,
      })

      return res.status(200).json({
        message: 'Vocês agora são amigos',
      })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    try {
      // const { userId: user_id, id_user } = req.body;

      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )
      const { idUser: id_user } = req.params
      const user_id = decodedToken.id

      const loggedUserFriendship = await Friendship.findOne({
        where: { user_id, id_user },
      })

      const friendFriendship = await Friendship.findOne({
        where: {
          user_id: id_user,
          id_user: user_id,
        },
      })

      await loggedUserFriendship.destroy()
      await friendFriendship.destroy()

      return res.json({
        // logged: loggedUserFriendship,
        // friend: friendFriendship
        message: 'Amizade desfeita com sucesso!',
      })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export default new FriendshipController()
