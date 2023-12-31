/* eslint-disable prettier/prettier */
const socketHandler = server => {
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3002',
    },
  })

  let users = []

  io.on('connection', socket => {
    console.log('User connected', socket.id)

    socket.on('addUser', userId => {
      const isUserExist = users.find(user => user.userId === userId)
      if (!isUserExist) {
        const user = { userId, socketId: socket.id }
        users.push(user)
        io.emit('getUsers', users)
      }
    })

    socket.on(
      'sendMessage',
      async ({ senderId, receiverId, message, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId)
        const sender = users.find(user => user.userId === senderId)
        const user = await users.findById(senderId)

        if (receiver) {
          io.to(receiver.socketId)
            .to(sender.socketId)
            .emit('getMessage', {
              senderId,
              message,
              conversationId,
              receiverId,
              user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
              },
            })
        } else {
          io.to(sender.socketId).emit('getMessage', {
            senderId,
            message,
            conversationId,
            receiverId,
            user: {
              id: user._id,
              fullName: user.fullName,
              email: user.email,
            },
          })
        }
      },
    )

    socket.on('disconnect', () => {
      users = users.filter(user => user.socketId !== socket.id)
      io.emit('getUsers', users)
    })
  })
}

module.exports = socketHandler
