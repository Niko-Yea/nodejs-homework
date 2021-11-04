const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'tmp')

const uploadsConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const uploads = multer({
  storage: uploadsConfig,
})

module.exports = uploads
