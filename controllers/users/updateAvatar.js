const { User } = require('../../model')
const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const checkDirExists = async path => {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

const updateAvatar = async (req, res, next) => {
  const { _id: id } = req.user
  const { path: tempDir, originalname } = req.file

  const oneStringFileName = originalname.split(' ').join('_')
  const [extension, ...filename] = oneStringFileName.split('.').reverse()
  const newFilename = `${id}_${filename}.${extension}`

  const avatarsDir = path.join(__dirname, `../../public/${id}/avatars/`)
  const uploadDir = path.join(avatarsDir, newFilename)

  const isDirExists = await checkDirExists(avatarsDir)
  if (!isDirExists) {
    await fs.mkdir(avatarsDir)
  }

  try {
    await fs.rename(tempDir, uploadDir)

    Jimp.read(uploadDir, (err, img) => {
      if (err) throw err
      img.resize(250, 250).write(uploadDir)
      console.log(uploadDir)
    })

    const image = path.join(`${id}/avatars`, newFilename)
    await User.findByIdAndUpdate(id, { avatarURL: image })

    res.status(200).json({
      avatarURL: image,
    })
  } catch (error) {
    await fs.unlink(tempDir)
    next(error)
  }
}

module.exports = updateAvatar
