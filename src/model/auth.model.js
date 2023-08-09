const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const AuthSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: "Email Address is Already Registered!",
      required: [true, "Email is required!"],
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      default: "verified",
      enum: ["verified", "pending", "blocked"],
    },
  },
  { timestamp: true }
);

AuthSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
  next();
});

AuthSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model("Auth", AuthSchema);