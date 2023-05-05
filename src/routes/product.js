// external import
const router = require("express").Router();
// internal imports
const {
  getProducts,
  getSingleProduct,
  postProduct,
  deleteProduct,
} = require("../controller/productController");
const errorHandler = require("../middleware/errorHandler");

router.post("/", postProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
