const Auth = require('../model/auth.model');
const createResponse = require('../utils/responseGenerate');
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt');

const signupUser = async (req, res, next) => {
  try {
    // catch the request body
    const body = req.body;
    // check if email exists
    if (body.email) {
      const existingUser = await Auth.findOne({ email: body.email });
      if (existingUser) {
        return res
          .status(400)
          .json(createResponse(null, 'Email already exists!', false));
      }
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    // create a new user
    const user = new Auth({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      // ... other fields
    });
    // save the user
    await user.save();
    // return response
    return res.json(createResponse(user, 'Registration successful', false));
  } catch (error) {
    next(error);
  }
};

// login
const login = async (req, res, next) => {
  try {
    // find the user
    const user = await Auth.findOne({ email: req.body.email });
    // check if user exists
    if (!user) {
      throw new Error('No user with this email!');
    }
    // check password
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    // check if password is valid
    if (!isValidPassword) {
      throw new Error('Incorrect email or password!');
    }
    // generate token
    const token = jwt.issueJWT(user);
    // return response
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
        'Login successful!',
        false,
      ),
    );
  } catch (err) {
    next(err);
  }
};

/* // registerUser
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
}; */

// google sing in
const googleSignin = async (req, res, next) => {
  try {
    const body = req.body; // Make sure you receive the user data in the request body
    // Check if the user already exists response this user
    if (body.email) {
      const existingUser = await Auth.findOne({ email: body.email });
      if (existingUser) {
        return res
          .status(201)
          .json(createResponse(existingUser, 'login successful!', false));
      }
    }
    // If user doesn't exist, save the data
    const user = new Auth(body);
    await user.save();
    return res
      .status(201)
      .json(createResponse(user, 'Registration successful', false));
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
    if (!user) throw new Error('No user found with this id!');
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
// get admin
const getAdmin = async (req, res, next) => {
  try {
    const user = await Auth.find({ role: 'admin' });
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

// update user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await Auth.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!user) {
      return res.json(createResponse(null, 'User not found', true, false));
    }
    return res.json(createResponse(user, 'User updated successfully', false));
  } catch (error) {
    next(error);
  }
};

// delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Auth.deleteOne({ _id: id });
    return res.json(createResponse(null, 'User deleted successfully', false));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupUser,
  login,
  googleSignin,
  getUsers,
  getUser,
  getAdmin,
  updateUser,
  deleteUser,
};
