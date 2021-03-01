const { ObjectID, Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const chatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [mongoose.Schema.Types.ObjectId],
    messages: [mongoose.Schema.Types.ObjectId]
})

chatSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

chatSchema.plugin(uniqueValidator);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;