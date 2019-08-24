const express = require('express')
const socket = require('socket.io')
const http = require('http')
const favicon = require('serve-favicon')

// heroku port compatibility
const PORT = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app)

const io = socket(server)

app.use('/', express.static(__dirname + '/frontend'))

// `favicon.ico` is in the `public` folder
app.use(express.static('public'))

//middleware for favicon 
app.use(favicon(__dirname + '/public/favicon.ico'))

io.on('connection', (socket) => {
    console.log("Connection established with : ", socket.id)

    socket.emit('connected')


    socket.on('down', (mouseDownKaData) => {
        // console.log(mouseDownKaData)
        io.emit('mouseIsDown', mouseDownKaData)
    })

    socket.on('moving', (mouseMoveKaData) => {
        // console.log("mouseMoveKaData", mouseMoveKaData)
        io.emit('mouseIsMoving', mouseMoveKaData)
    })
    
})

server.listen(PORT, () => {
    console.log("Running on : http://localhost:" + PORT);
})