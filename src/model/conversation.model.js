const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const Conversation = mongoose.model('Conversation', conversationSchema)
module.exports = Conversation
