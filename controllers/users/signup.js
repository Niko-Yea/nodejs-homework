const { User } = require('../../model')
const { BadRequest, Conflict } = require('http-errors')

const { joiSchemaAuth } = require('../../model/auth/users')

const signup = async (req, res) => {
  const { error } = joiSchemaAuth.validate(req.body)
  const { email, password } = req.body

  if (error) {
    throw new BadRequest(error.message)
  }

  const isUserRegistered = await User.findOne({ email })
  if (isUserRegistered) {
    throw new Conflict('Email in use')
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  const result = await newUser.save()

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  })
}

module.exports = signup
