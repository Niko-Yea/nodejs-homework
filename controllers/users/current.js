const { User } = require('../../model')

const current = async (req, res) => {
  const { id: userId } = req.user
  const user = await User.findById(userId)

  res.status(200).json({ email: user.email, subscription: user.subscription })
}

module.exports = current
