// const router = require('express').Router()
const { Router } = require('express')

const UserRoutes = require('./user.routes') // Ensure this path is correct
const CustomerRoutes = require('./customer.routes')
const AdminRoutes = require('./admin.routes')
// const ManagerRoutes = require('./manager.routes')
const ProductRoutes = require('./product.routes')
const CategoryRoutes = require('./category.routes')
const BrandRoutes = require('./brand.routes')
const OrderRoutes = require('./order.routes')
const ConversationRoutes = require('./conversation.routes')
const MessageRoutes = require('./message.routes')
const AuthRoutes = require('./auth.routes')
const BlogRoutes = require('./blog.routes')

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/customer',
    route: CustomerRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  // {
  //   path: '/manager',
  //   route: ManagerRoutes,
  // },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/brands',
    route: BrandRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/conversations',
    route: ConversationRoutes,
  },
  {
    path: '/messages',
    route: MessageRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

module.exports = router
