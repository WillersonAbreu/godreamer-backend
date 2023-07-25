import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { Op } from 'sequelize'

// Models
import Post from '../models/Post'
import User from '../models/User'
import FriendshipBO from '../BO/FriendshipBO'
import Group from '../models/Group'
import FollowGroup from '../models/FollowGroup'
import Friendship from '../models/Friendship'
import ProfileImage from '../models/ProfileImage'

// Controllers

class FeedController {
  async getSpecificUserPosts(req, res) {
    const { userId } = req.params

    try {
      const posts = await Post.findAll({
        where: { user_id: userId },
        include: [
          {
            model: User,
            // include: [
            //   {
            //     model: ProfileImage,
            //     attributes: {
            //       exclude: [
            //         'id',
            //         'name',
            //         'user_id',
            //         'is_active',
            //         'createdAt',
            //         'updatedAt',
            //       ],
            //     },
            //   },
            // ],
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'is_active',
                'user_type',
                'birthdate',
                'password',
                'email',
              ],
            },
          },
        ],
        attributes: {
          exclude: ['UserId', 'updatedAt'],
        },
        order: [['created_at', 'DESC']],
      })
      return res.status(200).json({ posts })
    } catch (error) {
      return res.json({ error: error.message })
    }
  }

  async getPosts(req, res) {
    const { userId } = req.params

    try {
      const friends = await FriendshipBO.getFriends(userId)
      let users = []

      users.push({ user_id: userId })

      await friends.map((friend) => {
        users.push({ user_id: friend.id_user })
      })

      const condition = {
        [Op.or]: users,
      }

      const posts = await Post.findAll({
        where: condition,
        include: [
          {
            model: User,
            include: [
              {
                model: ProfileImage,
                attributes: {
                  exclude: [
                    'id',
                    'name',
                    'user_id',
                    'is_active',
                    'createdAt',
                    'updatedAt',
                  ],
                },
              },
            ],
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'is_active',
                'user_type',
                'birthdate',
                'password',
                'email',
              ],
            },
          },
        ],
        attributes: {
          exclude: ['UserId', 'updatedAt'],
        },
        order: [['created_at', 'DESC']],
      })
      return res.status(200).json({ posts })
    } catch (error) {
      return res.json({ error: error.message })
    }
  }

  async getGroups(req, res) {
    const { userId: user_id } = req.params

    try {
      const followedGroups = await FollowGroup.findAll({
        where: {
          user_id,
        },
      })
      return res.status(200).json({ followedGroups })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async getOwnGroups(req, res) {
    const { userId: user_id } = req.params

    try {
      const myGroups = await Group.findAll({
        where: {
          user_id,
        },
      })
      return res.status(200).json({ myGroups })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async getUserPosts(req, res) {
    const { userId } = req.params

    try {
      const getPosts = await Post.findAll({
        where: {
          user_id: userId,
        },
        order: [['updated_at', 'DESC']],
      })

      return res.status(200).json({ post: getPosts })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async getFriends(req, res) {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )
      const user_id = decodedToken.id

      const friends = await FriendshipBO.getFriends(user_id)

      let friendsId = friends.map((friend) => friend.id_user)

      let users = []

      async function asyncForEach(friendsId) {
        for (let index = 0; index < friendsId.length; index++) {
          users.push(
            await User.findOne({
              where: { id: friendsId[index] },
              attributes: {
                exclude: [
                  'password',
                  'is_active',
                  'createdAt',
                  'updatedAt',
                  'profile_image_id',
                ],
              },
              include: [
                {
                  model: ProfileImage,
                  attributes: {
                    exclude: ['user_id', 'is_active', 'createdAt', 'updatedAt'],
                  },
                },
              ],
            }),
          )
        }
      }
      await asyncForEach(friendsId)

      return res.status(200).json({ friends: users })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export default new FeedController()
