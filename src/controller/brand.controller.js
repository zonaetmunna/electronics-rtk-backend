const Brand = require('../model/brand.model')
const createResponse = require('../utils/responseGenerate')

// Get all brands
const getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({}).populate('products')
    return res.json(brands)
  } catch (error) {
    next(error)
  }
}

// Get single brand by ID
const getSingleBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const brand = await Brand.findOne({ _id: id })
    if (!brand) throw new Error('No brand found with this id!')
    return res.json(brand)
  } catch (error) {
    next(error)
  }
}

// Create a new brand
const postBrand = async (req, res, next) => {
  try {
    const body = req.body
    const brand = new Brand(body)
    await brand.save()
    return res
      .status(201)
      .json(createResponse(brand, 'Brand added successfully!', false))
  } catch (error) {
    next(error)
  }
}

// update a brand by ID
const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const brand = await Brand.findOneAndUpdate({ _id: id }, body, {
      new: true,
    })
    if (!brand) throw new Error('No brand found with this id!')
    return res.json(brand)
  } catch (error) {
    next(error)
  }
}

// Delete a brand by ID
const deleteBrand = async (req, res, next) => {
  try {
    const id = req.params._id
    await Brand.deleteOne({ _id: id })
    return res.json(createResponse(null, 'Brand deleted successfully', false))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getBrands,
  getSingleBrand,
  postBrand,
  updateBrand,
  deleteBrand,
}
