// Sequelize
import Sequelize, { Op, where } from 'sequelize'

// Models
import ProfileImage from '../../models/ProfileImage'
import Friendship from '../../models/Friendship'
import Group from '../../models/Group'
import UserInfoDonation from '../../models/UserInfoDonation'

class UsersServiceUtils {
  /**
   * Where clause to return active users
   */
  findUserWhereClause = {
    is_active: true,
  }

  /**
   * Attributes to exclude when find users
   */
  excludedUserAttributesFromFindQueries = [
    'password',
    'is_active',
    'createdAt',
    'updatedAt',
    'profile_image_id',
  ]

  /**
   * Attributes to include when find users
   */
  includedUserAttributesFromFindQueries = [
    {
      model: ProfileImage,
      attributes: {
        exclude: ['user_id', 'is_active', 'createdAt', 'updatedAt'],
      },
    },
    {
      model: Friendship,
    },
    {
      model: Group,
    },
  ]

  /**
   * Attributes and relationships to build
   * into the email or name
   */
  async buildGetUserByLikeEmailOrName(emailOrName) {
    const Operator = Sequelize.Op

    let byLikeEmailOrNameSearch = {
      where: {
        [Operator.or]: [
          { name: { [Operator.like]: `%${emailOrName}%` } },
          { email: { [Operator.like]: `%${emailOrName}%` } },
        ],
      },
      attributes: { exclude: ['password'] },
      include: [{ model: ProfileImage }, { model: UserInfoDonation }],
    }

    return byLikeEmailOrNameSearch
  }
}

export default new UsersServiceUtils()
