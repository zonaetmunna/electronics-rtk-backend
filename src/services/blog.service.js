const Blog = require('../model/blog.model')

// Service to create a new blog
const createBlogIntoDB = async payload => {
  const blog = new Blog(payload)
  const savedBlog = await blog.save()
  if (!savedBlog) {
    throw new Error('Blog not created')
  }
  return savedBlog
}

// Service to fetch all blogs
const getAllBlogsFromDB = async () => {
  const blogs = await Blog.find({}).populate('author')
  if (!blogs) {
    throw new Error('Blogs not found')
  }
  return blogs
}

// Service to fetch a single blog by ID
const getSingleBlogFromDB = async id => {
  const blog = await Blog.findOne({ _id: id }).populate('author')
  if (!blog) {
    throw new Error('Blog not found')
  }
  return blog
}

// Service to update a blog by ID
const updateBlogInDB = async (id, body) => {
  const blog = await Blog.findOneAndUpdate({ _id: id }, body, { new: true })
  if (!blog) {
    throw new Error('Blog not found')
  }
  return blog
}

// Service to delete a blog by ID
const deleteBlogFromDB = async id => {
  await Blog.deleteOne({ _id: id })
}

const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
}

module.exports = BlogServices
