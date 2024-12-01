const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  completedTopics: [
    {
      chapterId: Number,
      subTopicIds: [Number],
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
