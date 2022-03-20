const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})
const cors = require('cors')

app.use(cors())

io.on('connection', (socket) => {

    socket.emit('me', socket.id)

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded')
    })

    socket.on('callUser', (data) => {
        io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal)
    })

})

server.listen(7000, () => console.log('success'))