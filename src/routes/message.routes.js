const { postMessage, getMessage } = require("../controller/message.controller");
const router = require("express").Router();

router.post("/", postMessage);
router.get("/:conversationId", getMessage);

module.exports = router;
