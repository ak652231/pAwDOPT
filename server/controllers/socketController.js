const Message = require('../models/Message');
const User = require('../models/User');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join chat', (requestId) => {
      socket.join(requestId);
      console.log(`User joined chat for request: ${requestId}`);
    });

    socket.on('leave chat', (requestId) => {
      socket.leave(requestId);
      console.log(`User left chat for request: ${requestId}`);
    });

    socket.on('chat message', async (message) => {
      try {
        const { requestId, senderId, receiverId, content, senderRole } = message;
        if (!senderId || !receiverId) {
          throw new Error('Sender and Receiver IDs are required');
        }

        const newMessage = new Message({
          requestId,
          senderId,
          receiverId,
          content,
          senderRole
        });

        await newMessage.save();

        io.to(requestId).emit('new message', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('error', 'Failed to save message');
      }
    });


    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

};