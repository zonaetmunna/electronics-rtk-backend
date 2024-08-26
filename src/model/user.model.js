const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('../config')

const userSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: [true, 'User id is required'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'User password is required'],
    },
    needPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['superAdmin', 'manager', 'customer', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// pre method for hashing password before saving
userSchema.pre('save', async function (next) {
  const user = this // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// post method for ignore password in response
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// statics methods for checking if the user exist
userSchema.statics.isUserExistsByCustomId = async function (id) {
  return await User.findOne({ id }).select('+password')
}

// statics methods for checking if passwords are matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

// statics methods for checking if JWT is issued before password changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp,
  jwtIssuedTimestamp,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000
  return passwordChangedTime > jwtIssuedTimestamp
}

const User = model('User', userSchema)

module.exports = User
