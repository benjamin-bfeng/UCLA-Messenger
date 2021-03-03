const usersRouter = require('express').Router();
const User = require('../models/user');
const auth = require('../auth');
const Chat = require('../models/chat');

// get all users from /api/users
usersRouter.get('/', async (request, response) => {
  const users = await User.find().populate({ path: 'courses', select: 'name' });
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

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  const getCourseIds = async () => {
    return Promise.all(
      body.courses.map(async course => {
        const chatId = await Chat.findOne({ name: course });

        return chatId._id;
      }),
    );
  };

  const updateCoursesArray = async (courses, userId) => {
    await courses.forEach(async courseId => {
      console.log(courseId);
      const chat = await Chat.findById(courseId);
      console.log(chat);
      chat.users = chat.users.concat(userId);
      await chat.save();
    });
  };

  const updatedCourses = await getCourseIds();

  const user = new User({
    name: body.name,
    username: body.username,
    password: body.password,
    courses: updatedCourses,
  });

  const savedUser = await user.save();
  await updateCoursesArray(user.courses, savedUser._id);
  response.json(savedUser);
});

// updated user by id at /api/users/:id
usersRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.params.id);

  // if user wants to delete a chat (new list of courses
  // differs from old list of courses)
  const removeUserFromChats = async newCourses => {
    await user.courses.forEach(async oldCourse => {
      const stringifiedCourse = JSON.stringify(oldCourse);

      if (!newCourses.includes(stringifiedCourse)) {
        const chat = await Chat.findById(oldCourse);

        const i = chat.users.indexOf(user.id);
        chat.users.splice(i, 1);
        await chat.save();
      }
    });
  };

  // convert User's course strings into their respective ids in database
  const getCourseIds = async () => {
    return Promise.all(
      body.courses.map(async course => {
        // add user's id to the users array in the courses being added
        const chat = await Chat.findOne({ name: course });

        if (!chat.users.includes(request.params.id)) {
          chat.users = chat.users.concat(request.params.id);
        }
        await chat.save();
        return chat.id;
      }),
    );
  };
  const updatedCourses = await getCourseIds();
  await removeUserFromChats(JSON.stringify(updatedCourses));

  const updatedUser = await User.findByIdAndUpdate(
    request.params.id,
    { ...body, courses: updatedCourses },
    {
      new: true,
      context: 'query',
      runValidators: true,
    },
  );

  response.json(updatedUser);
});

// delete user by id at /api/users/:id
usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  await user.remove();
  response.status(204).end();
});

module.exports = usersRouter;
