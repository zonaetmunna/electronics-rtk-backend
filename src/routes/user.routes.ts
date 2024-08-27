import { USER_ROLE } from '../constant/user.constant'
import auth from '../middleware/auth'
import { upload } from '../utils/sendImageToCloudinary'

const UserControllers = require('../controller/user.controller')

const express = require('express')

const router = express.Router()

router.post(
  '/create-customer',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data)
  //   next()
  // },
  // validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-manager',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data)
  //   next()
  // },
  // validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  // validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  // validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
)

router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserControllers.getMe,
)

export const UserRoutes = router
