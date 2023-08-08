const Order = require("../model/order.model");
const createResponse = require("../utils/responseGenerate");

const getOrder = async (req, res, next) => {
  try {
    const query = req.query;

    const products = await Order.find(query).populate("products");
    return res.json(products);
  } catch (error) {
    next(error);
  }
};

const postOrder = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const product = new Product(body);
    // save database
    await product.save();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrder,
  postOrder,
};
