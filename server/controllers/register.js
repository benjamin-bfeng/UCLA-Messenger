const express = require('express');
const Validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');
const Chat = require('../models/chat');
// register a new user at /api/register
router.post(
  '/',

  async (req, res) => {

    const { name, username, email, password, courses } = req.body;
    if (!email)
        return res.status(400).json({
          message: 'Must Input Email',
        });
    if (!Validator.isEmail(email))
        return res.status(400).json({
          message: 'Must Input Valid Email',
        });

    try {
      let user = await User.findOne({
        username,
      });
      if (user) {
        return res.status(400).json({
          msg: 'User Already Exists',
        });
      }

      // convert course strings to their respective ids
      const getCourseIds = async () => {
        return Promise.all(
          courses.map(async course => {
            const chatId = await Chat.findOne({ name: course });

            return chatId._id;
          }),
        );
      };

      // add users to courses array
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

      user = new User({
        name,
        username,
        email,
        password,
        courses: updatedCourses,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const savedUser = await user.save();
      await updateCoursesArray(user.courses, savedUser._id);

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        'randomString',
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            savedUser,
          });
        },
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Error in Saving');
    }
  },
);

module.exports = router;
