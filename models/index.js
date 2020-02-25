const mongoose = require('mongoose');

const db =
  process.env.NODE_ENV == 'testing'
    ? process.env.MONGO_URI_TESTING
    : process.env.MONGO_URI;
const debug = process.env.NODE_ENV == 'production' ? false : true;

mongoose.set('debug', debug);
mongoose.Promise = Promise;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    keepAlive: true,
    useUnifiedTopology: true,
  })
  .then(conn => console.log(`MongoDB Connected: ${conn.connection.host}`))
  .catch(error => console.log(error));

module.exports.Article = require('./article');
module.exports.Language = require('./language');
module.exports.Author = require('./author');
module.exports.User = require('./user');
