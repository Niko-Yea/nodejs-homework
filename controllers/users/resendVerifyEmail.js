const { User } = require('../../model')
const { BadRequest, NotFound } = require('http-errors')

const { sendEmail } = require('../../helpers')
const { createVerifyEmail } = require('../../templates')

const { joiSchemaVerify } = require('../../model/auth/users')

const resendVerifyEmail = async (req, res) => {
  const { error } = joiSchemaVerify.validate(req.body)
  const { email } = req.body

  if (error) {
    throw new BadRequest(error.message)
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound()
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  sendEmail(createVerifyEmail(user))

  res.json({ message: 'Verification email sent' })
}

module.exports = resendVerifyEmail
