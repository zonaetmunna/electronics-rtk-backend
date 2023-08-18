const router = require("express").Router();

router.use("/products", require("./product.routes"));
router.use("/category", require("./category.routes"));
router.use("/brand", require("./brand.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/order", require("./order.routes"));
router.use("/messages", require("./message.routes"));

module.exports = router;
