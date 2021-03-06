const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [mongoose.Schema.Types.ObjectId],
  picture:{type: String, default:'default.jpg'},
  //picture: { data: Buffer, contentType: String },
  role: {type: String, default:'Student'},
  bio: {type: String, default:'Introduce yourself!'}
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
