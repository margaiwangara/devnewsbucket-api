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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language"
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
