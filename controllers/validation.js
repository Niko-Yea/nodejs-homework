const Joi = require('joi')

const nameRegEx = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const phoneRegEx =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/

const post = Joi.object({
  name: Joi.string().pattern(nameRegEx).required().messages({
    'any.required': 'missing required name field',
    'string.pattern.base':
      'The name can only consist of letters, apostrophes, dashes and spaces.',
    'string.empty':
      'The name can only consist of letters, apostrophes, dashes and spaces.',
  }),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegEx).messages({
    'string.pattern.base':
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
    'string.empty':
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
  }),
})

const patch = Joi.object({
  name: Joi.string().pattern(nameRegEx).messages({
    'any.required': 'missing required name field',
    'string.pattern.base':
      'The name can only consist of letters, apostrophes, dashes and spaces.',
    'string.empty':
      'The name can only consist of letters, apostrophes, dashes and spaces.',
  }),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegEx).messages({
    'string.pattern.base':
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
    'string.empty':
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
  }),
})

module.exports = {
  post,
  patch,
}
