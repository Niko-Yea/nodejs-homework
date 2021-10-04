const { Schema, model } = require('mongoose')
const Joi = require('joi')

const nameRegEx = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const phoneRegEx =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
const nameValidationMessage =
  'The name can only consist of letters, apostrophes, dashes and spaces.'
const phoneValidationMessage =
  'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    match: [nameRegEx, nameValidationMessage],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: [phoneRegEx, phoneValidationMessage],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const Contact = model('contacts', contactSchema)

const joiSchemaPost = Joi.object({
  name: Joi.string().pattern(nameRegEx).required().messages({
    'any.required': 'missing required name field',
    'string.pattern.base': nameValidationMessage,
    'string.empty': nameValidationMessage,
  }),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegEx).messages({
    'string.pattern.base': phoneValidationMessage,
    'string.empty': phoneValidationMessage,
  }),
  favorite: Joi.boolean().messages({
    'boolean.base': 'value must be a boolean type',
  }),
})

const joiSchemaPatch = Joi.object({
  name: Joi.string().pattern(nameRegEx).messages({
    'string.pattern.base': nameValidationMessage,
    'string.empty': nameValidationMessage,
  }),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegEx).messages({
    'string.pattern.base': phoneValidationMessage,
    'string.empty': phoneValidationMessage,
  }),
  favorite: Joi.boolean().messages({
    'boolean.base': 'favorite must be a boolean type',
  }),
})

const joiSchemaPatchFavorite = Joi.object({
  favorite: Joi.boolean().messages({
    'boolean.base': 'favorite must be a boolean type',
  }),
}).messages({
  'object.unknown': 'in request body may be only key favorite',
})

module.exports = {
  Contact,
  joiSchemaPost,
  joiSchemaPatch,
  joiSchemaPatchFavorite,
}
