var app = require('../index.js')
var http = require('http').Server(app);
var io = require('socket.io')(http);

const chatRouter = require('express').Router()
const { request, response } = require('express')
const { findByIdAndDelete, findByIdAndRemove } = require('../models/chat')
const Chat = require('../models/chat')
const Message = require('../models/message')

io.on("connection", (socket) => {
    console.log("Socket is connected...")
})

// add a new message to a chat
// Looku up
chatRouter.post('/message/:id', async (request, response) => {
    const message = new Message(request.body)
    const msgObj = await message.save()

    const chat = await Chat.findById(request.params.id)
    msgArr = chat.messages
    msgArr.push(msgObj.id)
    await Chat.findByIdAndUpdate(
        chat.id,
        { messages: msgArr }
    )

    io.emit('message', msgObj)
    response.json(msgObj);
})

// get chat object  
chatRouter.get('/chat/:id', async (request, response) => {
    const chat = await Chat.findById(request.params.id);
    response.json(chat);
})

// get messages from ids 
chatRouter.get('/message/:id', async (request, response) => {
    const message = await Message.findById(request.params.id);
    response.json(message);
})

// new chat created 
chatRouter.post('/', async (request, response) => {
    const body = request.body
    const chat = new Chat({
        name: body.name,
        users: [], 
        messages: [],
    })
    const saved = await chat.save()
    response.json(saved)
})

// get all chats 
chatRouter.get('/', async (request, response) => {
    const chats = await Chat.find({}).exec()
    response.json(chats);
})

// delete a chat by id 
chatRouter.delete('/chat/:id', async (request, response) => {
    await Chat.findByIdAndDelete(request.params.id)
    response.sendStatus(200)
})

module.exports = chatRouter