const mongoose = require("mongoose");
const { Schema } = mongoose;

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

module.exports = mongoose.model("Auth", AuthSchema);
