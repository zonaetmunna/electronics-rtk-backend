const httpStatus = require('http-status')
const sendResponse = require('../utils/sendResponse')
const AdminServices = require('../services/admin.service')
const catchAsync = require('../utils/catchAsync')

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.getSingleAdminFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved successfully',
    data: result,
  })
})

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const { admin } = req.body
  const result = await AdminServices.updateAdminIntoDB(id, admin)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.deleteAdminFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  })
})

const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
}

module.exports = AdminControllers
