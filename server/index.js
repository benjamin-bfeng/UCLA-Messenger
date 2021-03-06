require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

const socket = require("socket.io");

const bodyParser = require('body-parser');
const usersRouter = require('./controllers/users');
const chatRouter = require('./controllers/chats')
const loginRouter = require('./controllers/login');
const registerRouter = require('./controllers/register');

const middleware = require('./utils/middleware');
const fs = require('fs');
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
app.use('/api/chats', chatRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

app.use(middleware.errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}`);

});

module.exports = app;
