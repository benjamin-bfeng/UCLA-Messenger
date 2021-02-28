const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
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
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password too short' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    name: body.name,
    username: body.username,
    password: passwordHash,
    courses: body.courses,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

usersRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const updatedUser = await User.findByIdAndUpdate(request.params.id, body, {
    new: true,
    context: 'query',
    runValidators: true,
  });
  response.json(updatedUser);
});

usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  await user.remove();
  response.status(204).end();
});

module.exports = usersRouter;
