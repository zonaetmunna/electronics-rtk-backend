const express = require("express");
const {
  getBrands,
  getSingleBrand,
  postBrand,
  deleteBrand,
  updateBrand,
} = require("../controller/brand.controller");
const router = express.Router();

// GET all brands
router.get("/", getBrands);

// GET a single brand by ID
router.get("/:id", getSingleBrand);

// POST a new brand
router.post("/", postBrand);

// update a brand by ID
router.put("/:id", updateBrand);

// DELETE a brand by ID
router.delete("/:id", deleteBrand);

module.exports = router;
