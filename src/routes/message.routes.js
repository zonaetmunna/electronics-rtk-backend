const router = require("express").Router();
const {
  getAllMessage,
  postMessage,
  getConversations,
  getConversationMessages,
  sendMessage,
} = require("../controller/message.controller");

// Get conversations for a specific user or admin
router.get(
  "/conversations/:userId",
  // authMiddleware,
  getConversations
);

// Get messages for a specific conversation
router.get(
  "/conversation/:conversationId",
  //   authMiddleware,
  getConversationMessages
);

// Send a message in a conversation
router.post(
  "/send/:conversationId",
  //   authMiddleware,
  sendMessage
);

/* const router = require("express").Router();

// get routes
router.get("/", getAllMessage);

// post routes
router.post("/", postMessage);

// update routes

// delete routes */

module.exports = router;
