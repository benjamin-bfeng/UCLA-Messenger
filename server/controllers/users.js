const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find();
  response.json(users);
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
  // user
  //   .save()
  //   .then(savedUser => {
  //     if (savedUser) {
  //       response.json(savedUser);
  //     } else {
  //       response.status(404).end();
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     response.status(400).send({ error: 'non unique username' });
  //   });
});

module.exports = usersRouter;
