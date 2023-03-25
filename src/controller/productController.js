const Product = require("../model/Product");
const createResponse = require("../utils/responseGenerate");

// get all products
const getProducts = async (req, res, next) => {
  try {
    // find product from server req
    const query = req.query;
    console.log(query);
    // find product with server req from database
    const products = await Product.find(query);
    console.log(products);

    return res.json(createResponse(products));
  } catch (err) {
    next(err);
  }
};
// get single product
const getSingleProduct = async (req, res, next) => {
  try {
    // find id from server
    const { id } = req.params;
    // server id use find database id
    const product = await Product.findOne({ _id: id });
    // check condition
    // if (!product) throw new Error("No product found with this id!");
    return res.json(createResponse(product, "single product geted", false));
  } catch (error) {
    next(error);
  }
};

// post product
const postProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const product = new Product(body);
    console.log(product);
    await product.save();
    return res.json(createResponse(null, "product added successfully", false));
  } catch (error) {
    next(error);
  }
};

// delete product
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params._id;
    const deleteProduct = await Product.deleteOne({ _id: id });
    return res.json(
      createResponse(null, "product deleted successfully", false)
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  postProduct,
  deleteProduct,
};
