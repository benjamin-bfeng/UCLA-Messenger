require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

const usersRouter = require('./controllers/users');
const chatRouter = require('./controllers/chats')
const middleware = require('./utils/middleware');

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/chats', chatRouter);

app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;