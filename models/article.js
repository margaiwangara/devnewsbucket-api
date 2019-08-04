const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true,
    maxlength: 500
  },
  datePublished: {
    type: Date
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  author: {
    name: {
      type: String,
      required: true
    },
    gravatar: {
      type: String
    }
  },
  language: {
    type: String,
    required: true
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
