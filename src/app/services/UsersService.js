import Sequelize, { Op } from 'sequelize';

// Models
import User from '../models/User';

// Utils
import {
  findUserWhereClause,
  excludedUserAttributesFromFindQueries,
  includedUserAttributesFromFindQueries
} from '../utils/services/UsersServiceUtils';

// Validator
import UserValidator from '../utils/validator/UsersValidator';
class UsersService {
    /**
     * @description 
     * @returns 
     */
    async findAllUsers() {
      return await User.findAll({
        where: findUserWhereClause,
        attributes: {
          exclude: excludedUserAttributesFromFindQueries,
        },
        include: includedUserAttributesFromFindQueries,
      });
    } 

    /**
     * @description Create an user
     */
    async store(userData, res) {
      await UserValidator.createUserValidate(userData);
      const user = await User.create(userData);
      return user;
    }

}

export default new UsersService();