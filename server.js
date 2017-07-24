var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(8080, () => {
    console.log('Listening for requests on port 8080.');
});

// Static files
app.use(express.static('src'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
