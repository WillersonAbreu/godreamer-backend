import Sequelize, { Op } from 'sequelize';

// Models
import User from '../models/User';

// Utils
import {
  findUserWhereClause,
  excludedUserAttributesFromFindQueries,
  includedUserAttributesFromFindQueries
} from '../utils/services/UsersServiceUtils';


class UsersService {

    async findAllUsers() {
      return await User.findAll({
        where: findUserWhereClause,
        attributes: {
          exclude: excludedUserAttributesFromFindQueries,
        },
        include: includedUserAttributesFromFindQueries,
      });
    } 

}

export default new UsersService();