const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

const chatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [mongoose.Schema.Types.ObjectId],
    messages: [Message]
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