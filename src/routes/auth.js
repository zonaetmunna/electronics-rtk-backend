// external import
const router = require("express").Router();

// internal import
const { registerUser, getUser } = require("../controller/authController");
const errorHandler = require("../middleware/errorHandler");

router.post("/user", registerUser);
router.get("/user/:email", getUser);

module.exports = router;
