const express = require('express')
const auth = require('../middleware/auth')
const { USER_ROLE } = require('../constant/user.constant')
const AdminControllers = require('../controller/admin.controller')

const router = express.Router()

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getAllAdmins,
)

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getSingleAdmin,
)

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),

  // validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
)

router.delete(
  '/:adminId',
  auth(USER_ROLE.superAdmin),
  AdminControllers.deleteAdmin,
)

const AdminRoutes = router

module.exports = AdminRoutes
