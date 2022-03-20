const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})
const cors = require('cors')

const { nanoid } = require('nanoid')
const initDatabase = require('./utils/db')

app.use(cors())

app.get('/', (req, res) => {

})

io.on('connection', (socket) => {
    
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId)
    })

})

server.listen(7000, () => console.log(`Server is listening on port 7000`))