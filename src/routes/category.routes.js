const express = require("express");
const {
  getCategories,
  getSingleCategory,
  postCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/category.controller");
const router = express.Router();

// GET all categories
router.get("/", getCategories);

// GET a single category by ID
router.get("/:id", getSingleCategory);

// POST a new category
router.post("/", postCategory);

// update a category by ID
router.put("/:id", updateCategory);

// DELETE a category by ID
router.delete("/:id", deleteCategory);

module.exports = router;
