const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  gravatar: {
    type: String
  }
  // articles: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Article"
  //   }
  // ]
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
