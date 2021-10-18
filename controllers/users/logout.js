const { User } = require('../../model')

const logout = async (req, res) => {
  const { id: userId } = req.user
  await User.findByIdAndUpdate(userId, { token: null })

  res.status(204).json()
}

module.exports = logout
