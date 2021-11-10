import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const AuthMiddleware = async (req, res, next) => {
  const BearerToken = req.headers.authorization

  if (!BearerToken) return res.status(401).json({ error: 'Token is missing' })

  let [, token] = BearerToken.split(' ')

  try {
    const verified = await promisify(jwt.verify)(token, process.env.JWT_KEY)

    req.body.userId = verified.id

    return next()
  } catch (error) {
    return res.status(401).json({ status: 401, error: error.message })
  }
}

export default AuthMiddleware
