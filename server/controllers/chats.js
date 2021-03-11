var app = require('../index.js');

const chatRouter = require('express').Router();
const { request, response } = require('express');
const { findByIdAndDelete, findByIdAndRemove } = require('../models/chat');
const Chat = require('../models/chat');
const Message = require('../models/message');
const User = require('../models/user');

// add new user to a chat
chatRouter.post('/user/:id', async (request, response) => {
  const user = await User.findById(request.body._id);
  const chat = await Chat.findById(request.params.id);
  userArr = chat.users;
  userArr.push(user.id);
  await Chat.findByIdAndUpdate(chat.id, { users: userArr });

  response.json(200);
});

// add a new message to a chat
// Looku up
chatRouter.post('/message/:id', async (request, response) => {
  const message = new Message(request.body);
  const msgObj = await message.save();

  const chat = await Chat.findById(request.params.id);
  msgArr = chat.messages;
  msgArr.push(msgObj.id);
  await Chat.findByIdAndUpdate(chat.id, { messages: msgArr });

});

// get chat object
chatRouter.get('/chat/:id', async (request, response) => {
  const chat = await Chat.findById(request.params.id);
  response.json(chat);
});

// get messages from ids
chatRouter.get('/message/:id', async (request, response) => {
  const message = await Message.findById(request.params.id);
  response.json(message);
});

// new chat created
chatRouter.post('/', async (request, response) => {
  const body = request.body;
  const chat = new Chat({
    name: body.name,
    users: [],
    messages: [],
  });
  const saved = await chat.save();
  response.json(saved);
});

// get all chats
chatRouter.get('/', async (request, response) => {
  const chats = await Chat.find({})
    .populate({ path: 'users', select: 'name username' })
    .populate({ path: 'messages', select: 'message',
        populate: {path: 'user', select: 'username'}
    });
  response.json(chats);
});

// delete a chat by id
chatRouter.delete('/chat/:id', async (request, response) => {
  await Chat.findByIdAndDelete(request.params.id);
  response.sendStatus(200);
});

// add like
chatRouter.put('/chat/like/:id', async (request, resposne) => {
    const chat = await Chat.findById(request.params.id);
    likeArr = chat.likes;
    if (likeArr.includes(request.body.user)) {
        likeArr.push(request.body.user);
    }
    await Chat.findByIdAndUpdate(request.params.id, { likes: likeArr });
    response.sendStatus(200);
})

//remove like
chatRouter.put('/chat/like/:id', async (request, resposne) => {
    const chat = await Chat.findById(request.params.id);
    likeArr = chat.likes;
    if (likeArr.includes(request.body.user)) {
        likeArr.remove(request.body.user);
    }
    await Chat.findByIdAndUpdate(request.params.id, { likes: likeArr });
    response.sendStatus(200);
})

module.exports = chatRouter;
