const { postOrder, getOrder } = require("../controller/orderController");

const router = require("express").Router();

router.post("/", postOrder);
router.get("/", getOrder);

module.exports = router;
