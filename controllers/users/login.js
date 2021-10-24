const { User } = require('../../model')
const { BadRequest, Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const { joiSchemaAuth } = require('../../model/auth/users')

const login = async (req, res) => {
  const { SECRET_KEY } = process.env
  const { error } = joiSchemaAuth.validate(req.body)
  const { email, password } = req.body

  if (error) {
    throw new BadRequest(error.message)
  }

  const user = await User.findOne({ email })

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY)

  await User.findByIdAndUpdate(user._id, { token }, { new: true })

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}

module.exports = login
