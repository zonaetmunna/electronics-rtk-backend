const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
