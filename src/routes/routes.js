const router = require('express').Router()

router.use('/products', require('./product.routes'))
router.use('/category', require('./category.routes'))
router.use('/brand', require('./brand.routes'))
router.use('/auth', require('./auth.routes'))
router.use('/order', require('./order.routes'))
router.use('/conversation', require('./conversation.routes'))
router.use('/message', require('./message.routes'))
router.use('/blogs', require('./blog.routes'))

module.exports = router
