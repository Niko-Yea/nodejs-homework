const contactsOperations = require('../../model/contacts')
const { BadRequest } = require('http-errors')

const schema = require('../validation')

const addContact = async (req, res) => {
  const { error } = schema.post.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }

  const result = await contactsOperations.addContact(req.body)
  res.status(201).json(result)
}

module.exports = addContact
