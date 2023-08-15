const Blog = require("../model/blog.model");
const createResponse = require("../utils/responseGenerate");

// create
const postBlog = async (req, res, next) => {
  try {
    const blogData = req.body;
    const blog = new Blog(blogData);
    const savedBlog = await blog.save();
    return res.json(createResponse(blog, "Blog created successfully", false));
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    return res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// get single blog
const getSingleBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id });
    return res.json(blog);
  } catch (error) {
    next(error);
  }
};

// update blog
const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const blog = await Blog.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!blog) {
      return res.json(createResponse(null, "Blog not found", true, false));
    }
    return res.json(createResponse(blog, "Blog updated successfully", false));
  } catch (error) {
    next(error);
  }
};

// delete blog
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Blog.deleteOne({ _id: id });
    return res.json(createResponse(null, "Blog deleted successfully", false));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
