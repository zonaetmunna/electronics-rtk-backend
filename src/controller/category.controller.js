const Category = require('../model/category.model')
const createResponse = require('../utils/responseGenerate')

const getCategories = async (req, res, next) => {
  try {
    let queries = { ...req.query }

    // Sort, page, limit -> exclude
    const excludeFields = [
      'search',
      'category',
      'sort',
      'page',
      'limit',
      'minPrice',
      'maxPrice',
    ]
    excludeFields.forEach(field => delete queries[field])

    // gt, lt, gte, lte
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`,
    )
    queries = JSON.parse(queryString)

    const filters = {
      limit: 10,
    }

    if (req.query.search) {
      const searchText = req.query.search
      queries.name = { $regex: searchText, $options: 'i' }
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      filters.sortBy = sortBy
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      filters.fields = fields
    }

    if (req.query.page) {
      const { page, limit } = req.query
      const skip = (page - 1) * parseInt(limit)
      filters.skip = skip
      filters.limit = parseInt(limit)
    }

    if (req.query.category) {
      const categoryName = req.query.category // Get category name from query
      queries.category = categoryName
    }

    // Handle minimum and maximum price
    if (req.query.minPrice !== undefined) {
      filters.price = { $gte: parseFloat(req.query.minPrice) }
    }
    if (req.query.maxPrice !== undefined) {
      filters.price = {
        ...filters.price,
        $lte: parseFloat(req.query.maxPrice),
      }
    }

    const categories = await Category.find({})
      .sort(filters.sortBy)
      .skip(filters.skip)
      .limit(filters.limit)
      .select(filters.fields)
      .populate('products')
      .exec()
    return res.json(categories)
  } catch (error) {
    next(error)
  }
}

// Get single category by ID
const getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await Category.findOne({ _id: id })
      .populate('products')
      .exec()
    if (!category) {
      return res.json(createResponse(null, 'Category not found', true))
    }
    return res.json(
      createResponse(category, 'Category fetched successfully', false),
    )
  } catch (error) {
    next(error)
  }
}

// Create a new category
const postCategory = async (req, res, next) => {
  try {
    const body = req.body
    const category = new Category(body)
    await category.save()
    return res
      .status(201)
      .json(createResponse(category, 'Category added successfully!', false))
  } catch (error) {
    next(error)
  }
}

// update a category by ID
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const category = await Category.findOneAndUpdate({ _id: id }, body, {
      new: true,
    })
    if (!category) throw new Error('No category found with this id!')
    return res.json(category)
  } catch (error) {
    next(error)
  }
}

// Delete a category by ID
const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params._id
    await Category.deleteOne({ _id: id })
    return res.json(
      createResponse(null, 'Category deleted successfully', false),
    )
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCategories,
  getSingleCategory,
  postCategory,
  updateCategory,
  deleteCategory,
}
