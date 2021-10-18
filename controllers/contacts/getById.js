const { Contact } = require('../../model')
const { NotFound } = require('http-errors')
const checkContact = require('./checkContact')

const getById = async (req, res) => {
  const { _id: userId } = req.user
  const { contactId } = req.params

  const isContactBelongsToUser = await checkContact(userId, contactId)

  if (!isContactBelongsToUser) {
    throw new NotFound('Not found')
  }

  const contact = await Contact.findById(contactId).populate('owner', 'email')

  if (!contact) {
    throw new NotFound('Not found')
  }

  res.json(contact)
}

module.exports = getById
