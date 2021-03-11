var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
var fileSystem = require('fs');


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + JSON.stringify(msg));
        fileSystem.appendFile('message.txt', JSON.stringify(msg), function (err) {
            if (err) throw err;
            console.log('Saved!');});
        io.emit('chat message', msg);
    });
});

http.listen(3002, function(){
    console.log('listening on *:3002');})