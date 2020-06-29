import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const SessionSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('É necessário inserir o email para logar'),
      password: Yup.string().required(
        'É necessário inserir a senha para logar'
      ),
    });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

    const { id, name, birthdate, user_type, is_active } = user;

    if (!is_active)
      return res.status(401).json({
        error:
          'Essa conta foi encerrada, por favor, entre em contato para reativá-la',
      });

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha ou email errado!' });
    }

    return res.status(200).json({
      success: true,
      token: jwt.sign(
        { id, name, email, birthdate, user_type },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      ),
    });
  }
}

export default new SessionController();
