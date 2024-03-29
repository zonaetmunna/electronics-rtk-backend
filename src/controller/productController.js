const Category = require('../model/category.model')
const Brand = require('../model/brand.model')
const Product = require('../model/product.model')
const createResponse = require('../utils/responseGenerate')

// get all products controller
const getProducts = async (req, res, next) => {
  try {
    let queries = { ...req.query }

    // Sort, page, limit -> exclude
    const excludeFields = [
      'search',
      'category',
      'brand',
      'sort',
      'page',
      'limit',
      'minPrice',
      'maxPrice',
      'stock',
    ]
    excludeFields.forEach(field => delete queries[field])

    // gt, lt, gte, lte
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`,
    )
    queries = JSON.parse(queryString)

    // filters
    const filters = {
      limit: 10,
    }

    // condition for search
    if (req.query.search) {
      const searchText = req.query.search
      queries.name = { $regex: searchText, $options: 'i' }
    }
    // condition for sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      filters.sortBy = sortBy
      console.log(sortBy)
    }
    // condition for fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      filters.fields = fields
      console.log(fields)
    }

    // handle filter page
    if (req.query.page) {
      const { page, limit } = req.query
      const skip = (page - 1) * parseInt(limit)
      filters.skip = skip
      filters.limit = parseInt(limit)
    }
    // handle category for query
    if (req.query.category) {
      const categoryName = req.query.category // Get category name from query
      queries['category.name'] = categoryName
    }

    if (req.query.brand) {
      const brandName = req.query.brand // Get brand name from query
      queries['brand.name'] = brandName
    }
    // handle stock
    if (req.query.stock) {
      queries.stock = req.query.stock
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

    // find product with server req from database
    const productsQuery = await Product.find(queries)
      .sort(filters.sortBy)
      .select(filters.fields)
      .skip(filters.skip)
      .limit(filters.limit)
      .populate('category brand')
      .exec()

    /*  // Check if 'category' field needs to be populated
    if (req.query.populateCategory) {
      productsQuery.populate("category");
    } */

    // const products = await productsQuery.exec();

    return res
      .status(200)
      .json(createResponse(productsQuery, 'Products get successfully', false))
  } catch (err) {
    next(err)
  }
}
// get single product
const getSingleProduct = async (req, res, next) => {
  try {
    // find id from server
    const { id } = req.params
    // server id use find database id
    const product = await Product.findOne({ _id: id })
    // check condition
    if (!product) {
      res
        .status(404)
        .json(createResponse(null, 'Product not found', true, false))
    }
    return res
      .status(200)
      .json(createResponse(product, 'Product get successfully', false))
  } catch (error) {
    next(error)
  }
}

// post product
const postProduct = async (req, res, next) => {
  try {
    const body = req.body
    // save database
    const product = await Product.create(body)
    console.log(product)

    const { _id: productId, category, brand } = product
    const result = await Brand.updateOne(
      { _id: brand.id },
      { $push: { products: productId } },
    )
    // Update the category's products array
    const categoryUpdateResult = await Category.updateOne(
      { _id: category.id }, // Use the category ID from the product
      { $push: { products: productId } },
    )
    return res.status(201).json(
      createResponse(
        {
          result,
          categoryUpdateResult,
        },
        'Product Added successfully!',
        false,
      ),
    )
  } catch (error) {
    next(error)
  }
}

// update products
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(id)
    const { userId, rating, comment } = req.body.data
    const newReview = {
      reviews: [
        // Update the review fields as needed
        {
          userId: userId,
          rating: rating,
          comment: comment,
        },
      ],
    }
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $push: { reviews: newReview } },
      { new: true },
    ).populate('reviews.userId')
    console.log(product)
    if (!product) {
      return res.json(createResponse(null, 'Product not found', true, false))
    }
    return res.json(
      createResponse(product, 'Product updated successfully', false),
    )
  } catch (error) {
    next(error)
  }
}

// delete product
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params._id
    await Product.deleteOne({ _id: id })
    return res.json(createResponse(null, 'product deleted successfully', false))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProducts,
  getSingleProduct,
  postProduct,
  updateProduct,
  deleteProduct,
}
