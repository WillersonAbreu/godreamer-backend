import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ error: 'User not found' });

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { id, name, birthdate, user_type, is_active } = user;

    if (!is_active)
      return res
        .status(401)
        .json({ error: 'This user is inactive, please activate the account' });

    return res.status(200).json({
      success: true,
      token: jwt.sign(
        { id, name, email, birthdate, user_type },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      )
    });
  }
}

export default new SessionController();
