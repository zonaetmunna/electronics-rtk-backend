const config = require('../config')
const { USER_ROLE } = require('../constant/user.constant')
const User = require('../model/user.model')

const superUser = {
  id: '0001',
  email: 'zonaetmonna@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
}

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin })

  if (!isSuperAdminExists) {
    await User.create(superUser)
  }
}

module.exports = seedSuperAdmin
