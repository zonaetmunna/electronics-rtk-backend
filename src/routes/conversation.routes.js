const {
  postConversation,
  getConversation,
} = require('../controller/conversation.controller')

const router = require('express').Router()
router.post('/', postConversation)
router.get('/:userId', getConversation)

module.exports = router
