const router = require('express').Router();
const {
  postBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getSingleBlog,
} = require('../controller/blog.controller');

router.post('/', postBlog);
router.get('/', getBlogs);
router.get('/:id', getSingleBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
