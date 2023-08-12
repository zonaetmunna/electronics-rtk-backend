const Auth = require("../model/auth.model");
const createResponse = require("../utils/responseGenerate");
const jwt = require("../lib/jwt");

// registerUser
const signupUser = async (req, res, next) => {
  try {
    const body = req.body;
    if (body.email) {
      const existingUser = await Auth.findOne({ email: body.email });
      if (existingUser) {
        throw new Error("Email already exists!");
      }
    }

    const user = new Auth(body);
    await user.save();
    console.log(user);
    return res.json(createResponse(user, "Registration successful", false));
  } catch (error) {
    next(error);
  }
};

//login
const login = async (req, res, next) => {
  try {
    // get user with finding
    const user = await Auth.findOne({ email: req.body.email });

    // check user
    if (!user) {
      throw new Error("No user with this email!");
    }

    const isValidPassword = await user.isValidPassword(req.body.password);

    if (!isValidPassword) {
      throw new Error("Incorrect email or password!");
    }

    const token = jwt.issueJWT(user);
    return res.json(
      createResponse(
        {
          firstName: user.name,
          lastName: user.lastName,
          email: user.email,
          _id: user._id,
          image: user.image,
          phone: user.phone,
          role: user.role,
          status: user.status,
          token,
        },
        "Login successful!",
        false
      )
    );
  } catch (err) {
    next(err);
  }
};

const saveGoogleUserData = async (req, res, next) => {
  try {
    const { userData } = req.body; // Make sure you receive the user data in the request body
    const user = new Auth(userData);
    await user.save();
    return res.json(
      createResponse(user, "Google user data saved successfully", false)
    );
  } catch (error) {
    next(error);
  }
};

// profile update
const profileUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await Auth.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!user) throw new Error("No user found with this id!");
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

// all users
const getUsers = async (req, res, next) => {
  try {
    const users = await Auth.find({});
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
// user
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Auth.findOne({ _id: id });
    if (!user) throw new Error("No user found with this id!");
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

// delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Auth.deleteOne({ _id: id });
    return res.json(createResponse(null, "User deleted successfully", false));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupUser,
  login,
  saveGoogleUserData,
  getUsers,
  getUser,
  profileUpdate,
  deleteUser,
};
