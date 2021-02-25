const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find();
  response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = new User({
    name: body.name,
    username: body.username,
    password: body.password,
    courses: body.courses,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  await user.remove();
  response.status(204).end();
});

module.exports = usersRouter;
