const Message = require("../model/message.model");
const createResponse = require("../utils/responseGenerate");

// Get conversations for a specific user or admin
async function getConversations(req, res) {
  try {
    const userId = req.params.userId;
    const conversations = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .distinct("sender")
      .distinct("recipient")
      .exec();

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get messages for a specific conversation
async function getConversationMessages(req, res) {
  try {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({
      conversation: conversationId,
    }).exec();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Send a message in a conversation
async function sendMessage(req, res) {
  try {
    const conversationId = req.params.conversationId;
    const { sender, recipient, message } = req.body;
    const newMessage = new Message({
      sender,
      recipient,
      message,
      conversation: conversationId,
    });
    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
}

module.exports = {
  getConversations,
  getConversationMessages,
  sendMessage,
};

/* // Get all messages
const getAllMessage = async (req, res, next) => {
  try {
    const messages = await Message.find({});
    return res.json(
      createResponse(messages, "Messages fetched successfully", false)
    );
  } catch (error) {
    next(error);
  }
};

// post message
const postMessage = async (req, res, next) => {
  try {
    const body = req.body;
    const message = await Message.create(body);
    return res.json(
      createResponse(message, "Message added successfully", false)
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMessage,
  postMessage,
};
 */
