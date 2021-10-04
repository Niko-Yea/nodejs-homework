const { Contact } = require('../../model')
const { NotFound } = require('http-errors')
const { isValidObjectId } = require('mongoose')

const getById = async (req, res) => {
  const { contactId } = req.params
  if (!isValidObjectId(contactId)) {
    throw new NotFound('Not found')
  }

  const contact = await Contact.findById(contactId)

  if (!contact) {
    throw new NotFound('Not found')
  }
  res.json(contact)
}

module.exports = getById
