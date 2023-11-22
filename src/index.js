const express = require('express');
const cors = require('cors');
require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes/routes');

const io = require('socket.io')(8080, {
  cors: {
    origin: 'http://localhost:3002',
  },
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let users = [];
io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('User connected', socket.id);
  socket.on('addUser', (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit('getUsers', users);
    }
  });

  socket.on(
    'sendMessage',
    async ({ senderId, receiverId, message, conversationId }) => {
      const receiver = users.find((user) => user.userId === receiverId);
      const sender = users.find((user) => user.userId === senderId);
      const user = await users.findById(senderId);
      // eslint-disable-next-line no-console
      console.log('sender :>> ', sender, receiver);
      if (receiver) {
        io.to(receiver.socketId)
          .to(sender.socketId)
          .emit('getMessage', {
            senderId,
            message,
            conversationId,
            receiverId,
            user: { id: user._id, fullName: user.fullName, email: user.email },
          });
      } else {
        io.to(sender.socketId).emit('getMessage', {
          senderId,
          message,
          conversationId,
          receiverId,
          user: { id: user._id, fullName: user.fullName, email: user.email },
        });
      }
    },
  );

  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });
  // io.emit('getUsers', socket.userId);
});

app.get('/', (req, res) => {
  res.json('hi electronics backend');
});
app.use('/api/v1', routes);

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listing the server port', port);
});
