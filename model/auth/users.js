const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  avatarURL: String,
})

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

const joiSchemaAuth = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
  }),
})

const joiSchemaVerify = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'missing required field email',
  }),
})

module.exports = {
  User,
  joiSchemaAuth,
  joiSchemaVerify,
}
