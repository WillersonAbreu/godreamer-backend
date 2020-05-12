"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class SessionController {
  async store(req, res) {
    const SessionSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Is necessary insert the email to login'),
      password: Yup.string().required(
        'Is necessary insert the password to login'
      )
    });

    const { email, password } = req.body;

    const user = await _User2.default.findOne({ where: { email } });

    if (!user) return res.status(400).json({ error: 'User not found' });

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, birthdate, user_type, is_active } = user;

    if (!is_active)
      return res
        .status(401)
        .json({ error: 'This user is inactive, please activate the account' });

    return res.status(200).json({
      success: true,
      token: _jsonwebtoken2.default.sign(
        { id, name, email, birthdate, user_type },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      )
    });
  }
}

exports. default = new SessionController();
