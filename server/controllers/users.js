const usersRouter = require('express').Router();
const User = require('../models/user');
const auth = require('../utils/auth');
const multer = require('multer');
let path = require('path');
var fs = require("fs");

// image helper functions, stored in uploads folder
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function(req, file, cb) {   
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

// takes in image file, stores in upload, and updates filepath in Mongo
usersRouter.put("/image/:id", auth, upload.single('picture'), async (req, res) => {


    const picture = req.file.filename;

    const newUserData = {
        picture: picture
    }

      const updatedUser = await (User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        context: 'query',
        runValidators: true,
      }));

      res.json(updatedUser);
});

//get user image
usersRouter.get("/image/:id", async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw Error;
    }
    res.sendFile(path.join(__dirname, "../uploads/" + user.picture));
  } catch (e) {
    res.send({ message: 'Error Fetching user' });
  }
});


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