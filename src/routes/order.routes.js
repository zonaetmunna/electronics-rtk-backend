const {
  postOrder,
  getOrder,
  getUserOrder,
  getSingleOrder,
} = require("../controller/orderController");

const router = require("express").Router();

router.post("/", postOrder);
router.get("/", getOrder);
router.get("/user/:email", getUserOrder);
router.get("/:id", getSingleOrder);

module.exports = router;
