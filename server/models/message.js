const { ObjectID, Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, required: true },
    timestamp: { type: Timestamp, required: true }
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

messageSchema.plugin(uniqueValidator);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;