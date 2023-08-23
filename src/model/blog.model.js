const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String, // Change the data type if categories have more details
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
