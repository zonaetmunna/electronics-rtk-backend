const httpStatus = require('http-status')
const sendResponse = require('../utils/sendResponse')
const catchAsync = require('../utils/catchAsync')
const CustomerServices = require('../services/customer.service')

const getSingleCustomer = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CustomerServices.getSingleCustomerFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer is retrieved successfully',
    data: result,
  })
})

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await CustomerServices.getAllCustomerFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers are retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

const updateCustomer = catchAsync(async (req, res) => {
  const { id } = req.params
  const { customer } = req.body
  const result = await CustomerServices.updateCustomerIntoDB(id, customer)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer is updated successfully',
    data: result,
  })
})

const deleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CustomerServices.deleteCustomerFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer is deleted successfully',
    data: result,
  })
})

const CustomerControllers = {
  getAllCustomers,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer,
}

module.exports = CustomerControllers
