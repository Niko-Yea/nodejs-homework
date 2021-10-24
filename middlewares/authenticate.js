const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../model')

const authenticate = async (req, _, next) => {
  const { SECRET_KEY } = process.env
  const { authorization } = req.headers
  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    throw new Unauthorized('Invalid token')
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)

    if (!user || !user.token) {
      console.log('cfvgbhnjkml,mnjbhvgbhnm')
      throw new Unauthorized('Not authorized')
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
