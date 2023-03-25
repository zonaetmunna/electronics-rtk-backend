// external imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

const keyFeatureSchema = new Schema({
  keyFeature0: String,
  keyFeature1: String,
  keyFeature2: String,
  keyFeature3: String,
});

const spcSchema = new Schema({
  processor: String,

  motherboard: String,

  ram: String,

  graphics: String,

  storage: String,

  casing: String,

  psu: String,

  cooler: String,
});

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
    keyFeature: keyFeatureSchema,
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    spec: spcSchema,
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", ProductSchema);
