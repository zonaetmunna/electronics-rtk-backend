const BlogServices = require('../services/blog.service')
const catchAsync = require('../utils/catchAsync')
const sendResponse = require('../utils/sendResponse')
const httpStatus = require('http-status')

const postBlog = catchAsync(async (req, res) => {
  const blogData = req.body
  const blog = await BlogServices.createBlogIntoDB(blogData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    data: blog,
  })
})

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await BlogServices.getAllBlogsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: blogs,
  })
})

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const blog = await BlogServices.getSingleBlogFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: blog,
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const body = req.body
  const blog = await BlogServices.updateBlogInDB(id, body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: blog,
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  await BlogServices.deleteBlogFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  })
})

const BlogControllers = {
  postBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}

module.exports = BlogControllers
