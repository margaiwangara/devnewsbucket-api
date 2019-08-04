const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    keepAlive: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(error => console.log(error));

module.exports.Article = require("./article");
module.exports.Language = require("./language");
module.exports.Author = require("./author");
module.exports.User = require("./user");
