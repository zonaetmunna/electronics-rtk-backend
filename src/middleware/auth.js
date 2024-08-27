const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../errors/AppError')
const config = require('../config')
const User = require('../model/user.model')

const auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    // checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_access_secret)
    console.log('🚀 ~ returncatchAsync ~ decoded:', decoded)

    const { role, userId, iat } = decoded

    // checking if the user exists
    const user = await User.isUserExistsByCustomId(userId)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
    }

    // checking if the user is already deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!')
    }

    // checking if the user is blocked
    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
    }

    // checking if the JWT was issued before the password was changed
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    // checking if the user's role is authorized
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    req.user = decoded
    next()
  })
}

module.exports = auth
