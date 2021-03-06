const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, default: 'default.jpg' },
  //picture: { data: Buffer, contentType: String },
  role: { type: String, default: 'Student' },
  bio: { type: String, default: 'Introduce yourself!' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
