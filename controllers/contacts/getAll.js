const { Contact } = require('../../model')

const getAll = async (req, res) => {
  const { _id: id } = req.user
  const allContacts = await Contact.find({ owner: id }).populate(
    'owner',
    'email',
  )
  res.json(allContacts)
}

module.exports = getAll
