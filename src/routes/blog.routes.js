const BlogControllers = require('../controller/blog.controller')

const router = require('express').Router()

router.post('/', BlogControllers.postBlog)
router.get('/', BlogControllers.getBlogs)
router.get('/:id', BlogControllers.getSingleBlog)
router.put('/:id', BlogControllers.updateBlog)
router.delete('/:id', BlogControllers.deleteBlog)

module.exports = router
