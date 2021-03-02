require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const registerRouter = require('./controllers/register');
const profileRouter = require('./controllers/profile');

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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/', profileRouter);

app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
