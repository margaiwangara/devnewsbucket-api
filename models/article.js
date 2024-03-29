const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  datePublished: {
    type: Date,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],
  language: {
    name: {
      type: String,
    },
    framework: {
      type: String,
    },
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
