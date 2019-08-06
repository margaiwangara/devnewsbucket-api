const mongoose = require("mongoose");
const config = require("config");
const db = process.env.MONGO_URI | config.get("mongoURI");
const debug = process.env.MONGO_DEBUG | true;

console.log("MONGO_URI" + process.env.MONGO_URI);

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
