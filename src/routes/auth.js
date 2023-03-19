const { registerUser, getUser } = require("../controller/authController");
const errorHandler = require("../middleware/errorHandler");

const router = require("express").Router();

router.post("/user", registerUser, errorHandler);
router.get("/user/:email", getUser, errorHandler);

module.exports = router;
