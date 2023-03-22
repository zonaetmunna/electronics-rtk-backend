// external import
const router = require("express").Router();

// internal import
const { registerUser, getUser } = require("../controller/authController");
const errorHandler = require("../middleware/errorHandler");

router.post("/user", registerUser, errorHandler);
router.get("/user/:email", getUser, errorHandler);

module.exports = router;
