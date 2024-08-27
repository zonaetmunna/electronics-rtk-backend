const httpStatus = require('http-status')
const mongoose = require('mongoose')
const AppError = require('../errors/AppError')
const QueryBuilder = require('../builder/QueryBuilder')
const Customer = require('../model/customer.model')
const { CustomerSearchableFields } = require('../constant/customer.constant')
const User = require('../model/user.model')

const getAllCustomerFromDB = async query => {
  const customerQuery = new QueryBuilder(Customer.find(), query)
    .search(CustomerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await customerQuery.modelQuery
  const meta = await customerQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleCustomerFromDB = async id => {
  const result = await Customer.findById(id)
  return result
}

const updateCustomerIntoDB = async (id, payload) => {
  const { name, ...remainingAdminData } = payload

  const modifiedUpdatedData = {
    ...remainingAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Customer.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteCustomerFromDB = async id => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedCustomer = await Customer.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Customer')
    }

    // get user _id from deletedAdmin
    const userId = deletedCustomer.user

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedCustomer
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const CustomerServices = {
  getAllCustomerFromDB,
  getSingleCustomerFromDB,
  updateCustomerIntoDB,
  deleteCustomerFromDB,
}

module.exports = CustomerServices
