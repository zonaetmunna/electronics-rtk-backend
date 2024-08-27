const cloudinary = require('cloudinary').v2
const fs = require('fs')
const multer = require('multer')
const config = require('../config')

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
})

function sendImageToCloudinary(imageName, path) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      function (error, result) {
        if (error) {
          reject(error)
        }
        resolve(result)
        // delete a file asynchronously
        fs.unlink(path, err => {
          if (err) {
            console.log(err)
          } else {
            console.log('File is deleted.')
          }
        })
      },
    )
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

const upload = multer({ storage: storage })

// To use the functions elsewhere in your code, you would need to export them
module.exports = {
  sendImageToCloudinary,
  upload,
}
