const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  difficulty: String,
  problems: [
    {
      id: Number,
      title: String,
      description: String,
      difficulty: String,
      youtubeLink: String,
      leetcodeLink: String,
      articleLink: String,
    },
  ],
});

module.exports = mongoose.model('Topic', topicSchema);
