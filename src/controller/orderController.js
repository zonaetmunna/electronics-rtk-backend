const Order = require('../model/order.model')
const createResponse = require('../utils/responseGenerate')

// get all orders
const getOrder = async (req, res, next) => {
  try {
    const query = req.query

    const products = await Order.find(query).populate('products')
    return res.json(products)
  } catch (error) {
    next(error)
  }
}

// get user based order
const getUserOrder = async (req, res, next) => {
  try {
    const query = req.query
    const { _id } = query
    const orders = await Order.find({ _id: _id }).populate('products user')
    return res.json({ orders, message: ' order get success' })
  } catch (error) {
    next(error)
  }
}

// get single order
const getSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(id)
    const order = await Order.findOne({ _id: id })
      .populate('products.product', 'name price')
      .populate('user', 'firstName lastName email')
    if (!order) {
      return res.json(createResponse(null, 'Order not found', true, false))
    }
    return res.json(createResponse(order, 'Order fetched successfully', false))
  } catch (error) {
    next(error)
  }
}

const postOrder = async (req, res, next) => {
  try {
    const orderData = req.body
    const order = new Order(orderData)
    const savedOrder = await order.save()
    return res.json({
      success: true,
      message: 'Order created successfully',
      order: savedOrder,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getOrder,
  getUserOrder,
  getSingleOrder,
  postOrder,
}
