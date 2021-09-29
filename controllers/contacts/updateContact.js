const contactsOperations = require('../../model/contacts')
const { NotFound, BadRequest } = require('http-errors')

const schema = require('../validation')

const updateContact = async (req, res) => {
  const { error } = schema.patch.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }

  const { contactId } = req.params
  const result = await contactsOperations.updateContact(contactId, req.body)

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest('missing fields')
  }

  if (!result) {
    throw new NotFound('Not found')
  }

  res.json(result)
}

module.exports = updateContact
