const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const createChatController = require('../controllers/chatController');

module.exports = (io) => {
  const chatController = createChatController(io);

  router.get('/requests/:requestId/messages', auth, chatController.getMessages);
  router.get('/requests', auth, chatController.getRequests);

  return router;
};
