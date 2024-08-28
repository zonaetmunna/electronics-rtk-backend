const auth = require('../middleware/auth')
const { USER_ROLE } = require('../constant/user.constant')
const ManagerControllers = require('../controller/manager.controller')

const router = require('express').Router()

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ManagerControllers.getAllManager,
)

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ManagerControllers.getSingleManager,
)

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),

  // validateRequest(updateAdminValidationSchema),
  ManagerControllers.updateManager,
)

router.delete(
  '/:adminId',
  auth(USER_ROLE.superAdmin),
  ManagerControllers.deleteManager,
)

module.exports = router
