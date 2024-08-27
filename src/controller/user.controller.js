const httpStatus = require('http-status')
const sendResponse = require('../utils/sendResponse')
const UserServices = require('../services/user.service')
const catchAsync = require('../utils/catchAsync')

// create customer controller
const createCustomer = catchAsync(async (req, res) => {
  const { customer } = req.body

  const result = await UserServices.createCustomerIntoDB(customer)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer is created successfully',
    data: result,
  })
})

const createManager = catchAsync(async (req, res) => {
  const { password, manager } = req.body

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    manager,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is created successfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body

  const result = await UserServices.createAdminIntoDB(req.file, password, admin)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user
  const result = await UserServices.getMe(userId, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await UserServices.changeStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  })
})

const UserControllers = {
  createCustomer,
  createManager,
  createAdmin,
  getMe,
  changeStatus,
}
module.exports = UserControllers
