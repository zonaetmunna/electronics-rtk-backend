// external imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    keyFeature: [
      { keyFeature0: String },
      { keyFeature1: String },
      { keyFeature2: String },
      { keyFeature3: String },
    ],
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    spec: [
      {
        processor: String,
      },
      {
        motherboard: String,
      },
      {
        ram: String,
      },
      {
        graphics: String,
      },
      {
        storage: String,
      },
      {
        casing: String,
      },
      {
        psu: String,
      },
      {
        cooler: String,
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", ProductSchema);
