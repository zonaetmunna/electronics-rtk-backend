const Message = require('../model/message.model');
const createResponse = require('../utils/responseGenerate');

const postMessage = async (req, res) => {
  try {
    const { conversationId, senderId, message } = req.body;
    const newMessage = new Message({
      conversationId,
      senderId,
      message,
    });
    await newMessage.save();
    res.json(createResponse(null, 'Message sent successfully', false));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get message
const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId });
    // modify
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  postMessage,
  getMessage,
};
