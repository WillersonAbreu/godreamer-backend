import ProfileImage from '../../models/ProfileImage';
import Friendship from '../../models/Friendship';
import Group from '../../models/Group';

class UsersServiceUtils {
  /**
   * Where clause to return active users
   */
  findUserWhereClause = {
    is_active: true
  };

  /**
   * Attributes to exclude when find users
   */
  excludedUserAttributesFromFindQueries = [
    'password',
    'is_active',
    'createdAt',
    'updatedAt',
    'profile_image_id',
  ];

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
   ];

}

export default new UsersServiceUtils();