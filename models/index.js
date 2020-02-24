const mongoose = require('mongoose');

const { MONGO_URI, MONGO_URI_TESTING, MONGO_DEBUG, NODE_ENV } = process.env;

const db = NODE_ENV == 'testing' ? MONGO_URI_TESTING : MONGO_URI;
const debug = MONGO_DEBUG || true;

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
