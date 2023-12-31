const router = require('express').Router()
const {
  getProducts,
  getSingleProduct,
  postProduct,
  deleteProduct,
  updateProduct,
} = require('../controller/productController')
router.post('/', postProduct)
router.get('/', getProducts)
router.get('/:id', getSingleProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
