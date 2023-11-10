const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	conversationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conversation',
	},
	senderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Auth',
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Auth',
	},
	message: {
		type: String,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
