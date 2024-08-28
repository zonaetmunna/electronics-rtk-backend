const httpStatus = require('http-status')
const mongoose = require('mongoose')
const AppError = require('../errors/AppError')
const QueryBuilder = require('../builder/QueryBuilder')
const User = require('../model/user.model')
const Manager = require('../model/manager.model')
const { ManagerSearchableFields } = require('../constant/manager.constant')

const getAllManagersFromDB = async query => {
  const managerQuery = new QueryBuilder(Manager.find(), query)
    .search(ManagerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await managerQuery.modelQuery
  const meta = await managerQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleManagerFromDB = async id => {
  const result = await Manager.findById(id)
  return result
}

const updateManagerIntoDB = async (id, payload) => {
  const { name, ...remainingManagerData } = payload

  const modifiedUpdatedData = {
    ...remainingManagerData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Manager.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteManagerFromDB = async id => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedManager = await Manager.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedManager) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Manager')
    }

    // get user _id from deletedAdmin
    const userId = deletedManager.user

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

    return deletedManager
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const ManagerServices = {
  getAllManagersFromDB,
  getSingleManagerFromDB,
  updateManagerIntoDB,
  deleteManagerFromDB,
}

module.exports = ManagerServices
