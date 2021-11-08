const { User } = require('../../model')
const { BadRequest, Conflict } = require('http-errors')
const { sendEmail } = require('../../helpers')
const { createVerifyEmail } = require('../../templates')

const path = require('path')
const fs = require('fs/promises')

const gravatar = require('gravatar')
const { v4 } = require('uuid')

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

  const verifyToken = v4()
  const avatarURL = gravatar.url(email)

  const newUser = new User({ email, avatarURL, verifyToken })
  newUser.setPassword(password)
  const result = await newUser.save()

  sendEmail(createVerifyEmail(newUser))

  const { id, email: usrEmail, subscription } = result

  const userDir = path.join(__dirname, '../../', 'public', id)
  await fs.mkdir(userDir)

  res.status(201).json({
    user: {
      email: usrEmail,
      subscription: subscription,
    },
  })
}

module.exports = signup
