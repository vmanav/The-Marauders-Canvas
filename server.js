const express = require('express')
const socket = require('socket.io')
const http = require('http')

const PORT = 3000;

const app = express();

const server = http.createServer(app)

const io = socket(server)

app.use('/', express.static(__dirname + '/frontend'))

// app.use(express.static('public')) , for favicon

io.on('connection', (socket) => {
    console.log("Connection established", socket.id)

    socket.emit('connected')


    socket.on('down', (mouseDownKaData) => {
        // console.log(mouseDownKaData)
        io.emit('mouseIsDown', mouseDownKaData)
    })

    socket.on('moving', (mouseMoveKaData)=>{
        console.log("mouseMoveKaData", mouseMoveKaData)
        io.emit('mouseIsMoving', mouseMoveKaData)
    })
    // socket.on('mov,ing', (mouseKaData) => {
        
    //     console.log(mouseKaData)
    //     io.emit('mouseIsMoving', mouseKaData)
    // })


})

server.listen(PORT, () => {
    console.log("Running on : http://localhost:" + PORT);
})