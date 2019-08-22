const express = require('express')
const socket = require('socket.io')
const http = require('http')

const PORT = 3000;

const app = express();

const server = http.createServer(app)

const io = socket(server)

app.use('/', express.static(__dirname + '/frontend'))

// app.use(express.static('public')) , for favicon