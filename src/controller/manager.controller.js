const httpStatus = require('http-status')
const sendResponse = require('../utils/sendResponse')
const catchAsync = require('../utils/catchAsync')
const ManagerServices = require('../services/manager.service')

const getSingleManager = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ManagerServices.getSingleManagerFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved successfully',
    data: result,
  })
})

const getAllManager = catchAsync(async (req, res) => {
  const result = await ManagerServices.getAllManagersFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager are retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

const updateManager = catchAsync(async (req, res) => {
  const { id } = req.params
  const { manager } = req.body
  const result = await ManagerServices.updateManagerIntoDB(id, manager)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is updated successfully',
    data: result,
  })
})

const deleteManager = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ManagerServices.deleteManagerFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is deleted successfully',
    data: result,
  })
})

const ManagerControllers = {
  getAllManager,
  getSingleManager,
  deleteManager,
  updateManager,
}

module.exports = ManagerControllers
