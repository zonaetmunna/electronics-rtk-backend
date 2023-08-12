const {
  postOrder,
  getOrder,
  getUserOrder,
} = require("../controller/orderController");

const router = require("express").Router();

router.post("/", postOrder);
router.get("/", getOrder);
router.get("/:email", getUserOrder);

module.exports = router;
