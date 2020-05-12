"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

const AuthMiddleware = async (req, res, next) => {
  const BearerToken = req.headers.authorization;

  if (!BearerToken) return res.status(401).json({ error: 'Token is missing' });

  let [, token] = BearerToken.split(' ');

  try {
    const verified = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, process.env.JWT_KEY);

    req.body.userId = verified.id;

    // if (req.body.email) {
    //   if (req.body.email !== verified.email) {
    //     return res.status(401).json({ error: `You can't change this user` });
    //   }
    // }

    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

exports. default = AuthMiddleware;
