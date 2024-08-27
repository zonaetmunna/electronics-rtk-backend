const httpStatus = require('http-status')

const User = require('../model/user.model')
const config = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AppError = require('../errors/AppError')
const { createToken, verifyToken } = require('../utils/auth.utils')
const { sendEmail } = require('../utils/sendEmail')

const loginUser = async payload => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //create token and sent to the  client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(jwtPayload, config.jwt_access_secret, '10d')

  const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret, '30d')

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needPasswordChange,
  }
}

const changePassword = async (userData, payload) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )

  return null
}

const refreshToken = async token => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret)

  const { userId, iat } = decoded

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  )

  return {
    accessToken,
  }
}

const forgetPassword = async userId => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const resetToken = createToken(jwtPayload, config.jwt_access_secret, '10m')

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `

  sendEmail(user.email, resetUILink)

  console.log(resetUILink)
}

const resetPassword = async (payload, token) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload?.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const decoded = jwt.verify(token, config.jwt_access_secret)

  //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  if (payload.id !== decoded.userId) {
    console.log(payload.id, decoded.userId)
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )
}

const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}

module.exports = AuthServices
