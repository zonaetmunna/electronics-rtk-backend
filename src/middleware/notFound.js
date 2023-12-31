/* eslint-disable prettier/prettier */
const httpStatus = require('http-status')

// eslint-disable-next-line no-unused-vars
const notFound = (req, res, next) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  })
}

module.exports = notFound
