const contactsOperations = require('../../model/contacts')

const getAll = async (req, res) => {
  const allContacts = await contactsOperations.getAllContacts()
  res.json(allContacts)
}

module.exports = getAll
