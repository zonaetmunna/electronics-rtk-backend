const httpStatus = require('http-status')
// import mongoose from 'mongoose'
const mongoose = require('mongoose')
// import QueryBuilder from '../../builder/QueryBuilder'
const AppError = require('../errors/AppError')
const User = require('../modules/user/user.model')
const Admin = require('../modules/admin/admin.model')
const { AdminSearchableFields } = require('../constant/admin.constant')
const QueryBuilder = require('../builder/QueryBuilder')

const getAllAdminsFromDB = async query => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.modelQuery
  const meta = await adminQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleAdminFromDB = async id => {
  const result = await Admin.findById(id)
  return result
}

const updateAdminIntoDB = async (id, payload) => {
  const { name, ...remainingAdminData } = payload

  const modifiedUpdatedData = {
    ...remainingAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteAdminFromDB = async id => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user

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

    return deletedAdmin
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
}

module.exports = AdminServices
