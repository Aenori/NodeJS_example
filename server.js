const express = require('express');
const hbs = require('hbs');
const path = require('path');
const http = require('http');

// const {Server} = require('socket.io');
const socketIo = require('socket.io');

const chatApp = require('./services/chatApp');
const routes = require('./routes/routes');

const app = express(); // const app = express.createWebServerApplication()
const server = http.createServer(app);
const io = new socketIo.Server(server);

app.set('view engine', hbs);
app.use('/', routes);
app.use(express.static(path.join(__dirname, '/public')));
chatApp.handleSocketIo(io);

module.exports = app;
