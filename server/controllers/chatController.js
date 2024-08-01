const Message = require('../models/Message');
const User = require('../models/User');

module.exports = (io) => {
  return {
    getMessages: async (req, res) => {
      try {
        const messages = await Message.find({ requestId: req.params.requestId })
          .sort({ timestamp: 1 })
          .populate('senderId')  
          .populate('receiverId');  

        res.json(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
      }
    },

    getRequests: async (req, res) => {
      try {
        console.log('Current user ID:', req.user.id);

        const currentUser = await User.findById(req.user.id);
        console.log('Current user role:', currentUser.role);

        const messages = await Message.find({
          $or: [
            { senderId: req.user.id },
            { receiverId: req.user.id }
          ]
        })
        .populate({
          path: 'requestId',
          model: 'AdoptionForm',
          select: 'petId userId status createdAt',
          populate: [
            {
              path: 'userId',
              model: 'User',
              select: 'name'
            },
            {
              path: 'petId',
              model: 'Pet',
              select: 'name'
            }
          ]
        })
        .sort({ timestamp: -1 });

        const requestMap = new Map();
        messages.forEach(message => {
          if (!requestMap.has(message.requestId._id.toString())) {
            requestMap.set(message.requestId._id.toString(), message);
          }
        });

        const requests = Array.from(requestMap.values()).map(message => ({
          _id: message.requestId._id,
          petName: message.requestId.petId.name,
          status: message.requestId.status,
          createdAt: message.requestId.createdAt,
          user: message.requestId.userId,
          latestMessage: {
            content: message.content,
            timestamp: message.timestamp,
            sender: message.senderId,
            receiver: message.receiverId
          }
        }));

        console.log('Requests found:', requests);

        res.json(requests);
      } catch (error) {
        console.error('Error fetching chat requests:', error);
        res.status(500).json({ message: 'Server Error', error: error.message, stack: error.stack });
      }
    }
  };
};
