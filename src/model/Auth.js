const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthSchema = new Schema(
  {
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
      // default: "user",
      enum: ["admin", "merchant", "user"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Auth", AuthSchema);
