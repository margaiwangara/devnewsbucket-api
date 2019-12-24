const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    gravatar: {
      type: String
    }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        (ret.id = ret._id), delete ret._id;
      }
    },
    toObject: {
      virtuals: true
    }
  }
);

// get author's articles
authorSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "authors",
  justOne: false
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
