const chatRouter = require('express').Router()
const { request, response } = require('express')
const { findByIdAndDelete } = require('../models/chat')
const Chat = require('../models/chat')
const Message = require('../models/message')

// add a new message to a chat
chatRouter.post('/message/:id', async (request, response) => {
    const body = request.body
    const message = new Message({
        user: body.user,
        chat: body.chat,

    })
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

chatRouter.get('/', async (request, response) => {
    const chats = await Chat.find({}).exec()
    response.json(chats);
})

chatRouter.delete('/chat/:id', async (request, response) => {
    await Chat.findByIdAndDelete(request.params.id)
    response.sendStatus(200)
})

module.exports = chatRouter