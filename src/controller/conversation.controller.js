const Conversation = require('../model/conversation.model')
const createResponse = require('../utils/responseGenerate')

// post conversation
const postConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    })
    await newConversation.save()
    res.json(createResponse(null, 'Conversation created successfully', false))
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// get conversation by id
const getConversation = async (req, res) => {
  try {
    const userId = req.params.userId
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    })
    // modify
    res.json(conversation)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  postConversation,
  getConversation,
}
