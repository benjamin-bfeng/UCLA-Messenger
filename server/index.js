var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});


io.on('connection', function(socket){
     console.log('a user connected');
     socket.on('chat message', function(msg){
         console.log('message: ' + JSON.stringify(msg));
         io.emit('chat message', msg)
     });
});

http.listen(3001, function(){
  console.log('listening on *:3001');})

/*WRITTEN BY BE
=======
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const usersRouter = require('./controllers/users');

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
>>>>>>> a0c4b558881423741d9d6526334d96eee0ca160b
});
*/
