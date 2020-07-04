"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

// Models
var _UserInfoDonation = require('../models/UserInfoDonation'); var _UserInfoDonation2 = _interopRequireDefault(_UserInfoDonation);

class UserInfoDonationController {
  async index(req, res) {
    // const [, token] = req.headers.authorization.split(' ');
    // const decodedToken = await promisify(jwt.verify)(
    //   token,
    //   process.env.JWT_KEY
    // );
    const user_id = req.params.groupOwnerId; //decodedToken.id;

    try {
      const infoDonation = await _UserInfoDonation2.default.findAll({
        where: { user_id },
      });
      return res.status(200).json({ UserInfoDonations: infoDonation });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async store(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;
    const { information, account, cpf, bank_name, agency_number } = req.body;

    try {
      let checkinfoDonation = 0;
      checkinfoDonation = await _UserInfoDonation2.default.findAll({
        where: { user_id },
      });

      if (checkinfoDonation == 0) {
        const infoDonation = await _UserInfoDonation2.default.create({
          information,
          account,
          user_id,
          cpf,
          bank_name,
          agency_number,
        });
        return res.status(200).json(infoDonation);
      } else {
        return res.status(400).json({
          error: "Can't create another donation info for the same user",
        });
      }
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async update(req, res) {
    // const [, token] = req.headers.authorization.split(' ');
    // const decodedToken = await promisify(jwt.verify)(
    //   token,
    //   process.env.JWT_KEY
    // );

    // const user_id = decodedToken.id;
    const { userId: user_id } = req.params;

    const { information, account, cpf, bank_name, agency_number } = req.body;

    try {
      let checkinfoDonation = null;
      checkinfoDonation = await _UserInfoDonation2.default.findOne({
        where: { user_id },
      });

      if (checkinfoDonation == null)
        return res
          .status(400)
          .json({ error: "Couldn't find a info donation for this user id." });

      if (checkinfoDonation.user_id != user_id) {
        return res
          .status(400)
          .json({ error: 'Cannot change a info donation by another user' });
      }

      await checkinfoDonation.update({
        information,
        account,
        cpf,
        bank_name,
        agency_number,
      });
      return res.status(200).json(checkinfoDonation);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async delete(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;

    try {
      const infoDonation = await _UserInfoDonation2.default.findOne({
        where: { user_id },
      });
      if (infoDonation == null) {
        return res.status(400).json({ message: 'Info not found' });
      }
      await infoDonation.destroy();
      return res
        .status(200)
        .json({ message: 'Donation info deleted successfully' });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

exports. default = new UserInfoDonationController();
