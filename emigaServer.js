const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
const httpServer = createServer(app)

app.use(cors({
    origin: 'http://localhost:8002'
}))

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:8002',
    }
})

io.on('connection', (socket) => {
    socket.on('stream', (data) => {
        socket.broadcast.emit('stream', data)
    })
})

io.of('/stream').sockets.forEach((client) => {
    console.log(client);
})

httpServer.listen(5000, () => console.log('Server is up and running!'))