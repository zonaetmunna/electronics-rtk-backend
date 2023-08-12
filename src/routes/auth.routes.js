// external import
const router = require("express").Router();
const passport = require("passport");

// internal import
const {
  signupUser,
  getUser,
  login,
  getUsers,
  profileUpdate,
  deleteUser,
  saveGoogleUserData,
} = require("../controller/authController");
const errorHandler = require("../middleware/errorHandler");

router.post("/signup", signupUser, errorHandler);
router.post("/login", login, errorHandler);
router.post("/saveGoogleUserData", saveGoogleUserData);
router.get(
  "/users",
  //   passport.authenticate("jwt", { session: false }),
  getUsers
);
router.get("/user/:id", getUser);
router.put("/user/:id", profileUpdate);
router.delete("/user/:id", deleteUser);

module.exports = router;
