var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
var fileSystem = require('fs');


const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI;

const { findByIdAndDelete, findByIdAndRemove } = require('./models/chat');
const Chat = require('./models/chat');
const Message = require('./models/message');
const User = require('./models/user');

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});


io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('chat message', function(msg) {
        const message = new Message(msg.data);
        const msgObj = message.save();

        const chat = Chat.findById(socket.handshake.query['id']);
        msgArr = chat.messages;
        msgArr.push(msgObj.id);
        Chat.findByIdAndUpdate(chat.id, { messages: msgArr });

        io.emit('message', msgObj);
    });
});

http.listen(3002, function(){ 
    console.log('listening on *:3002');
})
