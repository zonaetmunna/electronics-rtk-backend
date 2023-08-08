const router = require("express").Router();

router.use("/products", require("./product.routes"));
router.use("/category", require("./category.routes"));
router.use("/brand", require("./brand.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/order", require("./order.routes"));

module.exports = router;
