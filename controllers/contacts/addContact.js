const { Contact } = require('../../model')
const { BadRequest } = require('http-errors')

const { joiSchemaPost } = require('../../model/contacts')

const addContact = async (req, res) => {
  const { error } = joiSchemaPost.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }

  const result = await Contact.create(req.body)
  res.status(201).json(result)
}

module.exports = addContact
