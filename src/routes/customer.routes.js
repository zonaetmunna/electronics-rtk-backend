const auth = require('../middleware/auth')
const { USER_ROLE } = require('../constant/user.constant')
const CustomerControllers = require('../controller/customer.controller')

const router = require('express').Router()

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CustomerControllers.getAllCustomers,
)

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CustomerControllers.getSingleCustomer,
)

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),

  // validateRequest(updateAdminValidationSchema),
  CustomerControllers.updateCustomer,
)

router.delete(
  '/:adminId',
  auth(USER_ROLE.superAdmin),
  CustomerControllers.deleteCustomer,
)

module.exports = router
