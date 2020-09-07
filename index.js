const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const colors = require('colors');
const connectDB = require('./models');

// security
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// load env
process.env.NODE_ENV = 'development';
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './config/config.env' });
}

// initialize express
const app = express();

// static files in public folder
app.use(express.static(path.join(__dirname, 'public')));
// view engine
app.set('view engine', 'ejs');

// invoke middleware
app.use(express.json()); //body-parser
app.use(cookieParser());
app.use(fileUpload());

// security middleware
// rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(mongoSanitize()); //sanitize input to prevent NoSQL Injection
app.use(helmet()); //helmet to add headers and prevent security flaws
app.use(xssClean()); //prevent xss attacks eg <script></script> tags in db
app.use(limiter); //no of request rate limited
app.use(hpp()); //prevent http param polution
app.use(cors()); //enabled cors for all routes

// Connect DB
connectDB();
// Web Routes
const homeRoutes = require('./routes/web/home');
app.use('/', homeRoutes);

// API Routes
const authorRoutes = require('./routes/authors');
const articleRoutes = require('./routes/articles');
const languageRoutes = require('./routes/languages');
const authRoutes = require('./routes/auth');
app.use('/api/authors', authorRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/auth', authRoutes);

// require cron for continous requests
require('./lib/cron');

// error handler
app.use((req, res, next) => {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});
const errorHandler = require('./handlers/errors');
app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

module.exports = app;
