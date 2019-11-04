const express = require("express");
const app = express();

// body parser
app.use(express.json());

// view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

// delete all data from authors and articles
const db = require("./models");
// db.Author.deleteMany({})
//   .then(() => console.log("All authors deleted"))
//   .catch(error => console.log(error));
// db.Article.deleteMany({})
//   .then(() => console.log("All articles deleted"))
//   .catch(error => console.log(error));

// import scrapping file
const { runCreateArticleCron } = require("./lib/service");
app.get("/display", async (req, res) => {
  try {
    const result = await runCreateArticleCron();
    console.log(result.length);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});
// middlewares
const { loginRequired, userAuthorized } = require("./middlewares/auth");
// Api Routing
const authorRoutes = require("./routes/authors");
const articleRoutes = require("./routes/articles");
const languageRoutes = require("./routes/languages");
const authRoutes = require("./routes/auth");

// Author Routes
app.use("/api/authors", authorRoutes);
// Article Routes
app.use("/api/articles", articleRoutes);
// Language Routes
app.use("/api/languages", languageRoutes);
// Auth Routes
app.use("/api/auth", authRoutes);

// require cron for continous requests
require("./lib/cron");

//all routes
app.use((req, res, next) => {
  let err = Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
const errorHandler = require("./handlers/errors");
app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;
// listen
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
