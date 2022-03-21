const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { ExpressPeerServer } = require('peer')

const app = express()
const httpServer = createServer(app)

const peerServer = ExpressPeerServer(httpServer)

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
})

app.use('/peer', peerServer)

app.get('/', (req, res) => {
    res.send('Hello World')
})

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)
    })
})

httpServer.listen(5000, () => console.log('Server is up and running!'))