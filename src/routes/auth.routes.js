// external import
const router = require("express").Router();
const passport = require("passport");

// internal import
const {
  registerUser,
  getUser,
  login,
  getUsers,
  profileUpdate,
  deleteUser,
} = require("../controller/authController");
const errorHandler = require("../middleware/errorHandler");

router.post("/signup", registerUser, errorHandler);
router.post("/login", login, errorHandler);
router.get(
  "/users",
  //   passport.authenticate("jwt", { session: false }),
  getUsers
);
router.get("/user/:id", getUser);
router.put("/user/:id", profileUpdate);
router.delete("/user/:id", deleteUser);

module.exports = router;
