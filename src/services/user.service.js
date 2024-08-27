const config = require('../config')

const httpStatus = require('http-status')
const mongoose = require('mongoose')
const Admin = require('../model/admin.model')

const User = require('../model/user.model')

const Customer = require('../model/customer.model')
const AppError = require('../errors/AppError')
const Manager = require('../model/manager.model')
const { generateManagerId, generateAdminId } = require('../utils/user.utils')

const createCustomerIntoDB = async payload => {
  console.log('🚀 ~ payload:', payload)

  // create a user object
  const customerData = {
    role: 'customer',
    email: payload.email,
    password: payload.password,
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // create a user (transaction-1)
    const newUser = await User.create([customerData], { session }) // array

    //create a customer
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    const customerPayload = {
      ...payload,
      user: newUser[0]._id, // Reference to the created User
    }

    const newCustomer = await Customer.create([customerPayload], { session })

    if (!newCustomer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create customer')
    }

    await session.commitTransaction()
    await session.endSession()

    return newCustomer
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createManagerIntoDB = async (file, password, payload) => {
  // create a user object
  const userData = {}

  //if password is not given , use deafult password
  userData.password = password || config.default_password

  //set faculty role
  userData.role = 'manager'
  //set faculty email
  userData.email = payload.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateManagerId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)

    const newManager = await Manager.create([payload], { session })

    if (!newManager.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Manager')
    }

    await session.commitTransaction()
    await session.endSession()

    return newManager
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createAdminIntoDB = async (file, password, payload) => {
  // create a user object
  const userData = {}

  //if password is not given , use deafult password
  userData.password = password || config.default_password

  //set student role
  userData.role = 'admin'
  //set admin email
  userData.email = payload.email
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getMe = async (userId, role) => {
  let result = null
  if (role === 'student') {
    result = await Customer.findOne({ id: userId }).populate('user')
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user')
  }

  if (role === 'manager') {
    result = await Manager.findOne({ id: userId }).populate('user')
  }

  return result
}

const changeStatus = async (id, payload) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const UserServices = {
  createCustomerIntoDB,
  createManagerIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
}

module.exports = UserServices
