const { Contact } = require('../../model')
const { BadRequest } = require('http-errors')

const { joiSchemaPost } = require('../../model/contacts/contacts')

const addContact = async (req, res) => {
  const { user } = req
  const { error } = joiSchemaPost.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }

  const newContact = { ...req.body, owner: user._id }

  const result = await Contact.create(newContact)
  res.status(201).json(result)
}

module.exports = addContact
