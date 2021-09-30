const contactsOperations = require('../../model/contacts')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
  const { contactId } = req.params
  const contact = await contactsOperations.getContactById(contactId)
  if (!contact) {
    throw new NotFound('Not found')
  }
  res.json(contact)
}

module.exports = getById
