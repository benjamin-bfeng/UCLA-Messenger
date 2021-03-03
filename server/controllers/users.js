const usersRouter = require('express').Router();
const User = require('../models/user');
const auth = require('../auth');

// get all users from /api/users
usersRouter.get('/', async (request, response) => {
  const users = await User.find();
  response.json(users);
});

// get logged in user from /api/users/me
usersRouter.get('/me', auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error Fetching user' });
  }
});

// get user by username from /api/users/:username
usersRouter.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      throw Error;
    }
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error Fetching user' });
  }
});

// usersRouter.post('/', async (request, response) => {
//   const body = request.body;
//   const user = new User({
//     name: body.name,
//     username: body.username,
//     password: body.password,
//     courses: body.courses,
//   });

//   const savedUser = await user.save();
//   response.json(savedUser);
// });

// updated user by id at /api/users/:id
usersRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const updatedUser = await User.findByIdAndUpdate(request.params.id, body, {
    new: true,
    context: 'query',
    runValidators: true,
  });
  response.json(updatedUser);
});

// delete user by id at /api/users/:id
usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  await user.remove();
  response.status(204).end();
});

module.exports = usersRouter;
