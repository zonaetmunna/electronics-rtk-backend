// external imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
	{
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Auth',
			required: true,
		},

		totalAmount: {
			type: Number,
			required: true,
		},
		address: {
			street: String,
			city: String,
			state: String,
			postalCode: String,
			country: String,
		},
		paymentIntentId: {
			// Add a field to store the Stripe Payment Intent ID
			type: String,
		},
		status: {
			type: String,
			enum: ['pending', 'shipped', 'delivered'],
			default: 'pending',
		},

		createdAt: {
			type: Date,
			default: Date.now,
		},
		// ... other fields
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
