// external imports
const mongoose = require('mongoose')

const spcSchema = mongoose.Schema({
  processor: String,

  motherboard: String,

  ram: String,

  graphics: String,

  storage: String,

  casing: String,

  psu: String,

  cooler: String,
})

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },
    othersImage: [String],
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    category: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
      },
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Auth',
        },
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    stock: {
      type: Boolean,
      // required: true,
    },

    specifications: spcSchema,
  },
  { timestamp: true },
)

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
