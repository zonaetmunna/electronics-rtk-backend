const Auth = require("../model/Auth");
const createResponse = require("../utils/responseGenerate");

// registerUser
const registerUser = async (req, res, next) => {
  try {
    const body = req.body;
    const user = new Auth(body);
    await user.save();
    return res.json(createResponse(user, "registration successfully", false));
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const result = await Auth.findOne({ email });
    if (result?.email) {
      return res.send({ status: true, data: result });
    }
    res.send({ status: false });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, getUser };
