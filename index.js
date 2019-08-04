const express = require("express");
const app = express();
const axios = require("axios");

// view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

// Api Routing
const authorRoutes = require("./routes/authors");
const articleRoutes = require("./routes/articles");
// Author Routes
app.use("/api/authors", authorRoutes);
// Article Routes
app.use("/api/articles", articleRoutes);

//all routes
app.use((req, res, next) => {
  let err = Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
const errorHandler = require("./handlers/errors");
app.use(errorHandler);

// automated acquisition
const duration = 1000 * 60;
const url = "https://devnewsbucket.herokuapp.com/api";
const db = require("./models");

// db.Article.deleteMany({})
//   .then(res => console.log(res))
//   .catch(error => console.log(error));
// db.Author.deleteMany({})
//   .then(res => console.log(res))
//   .catch(error => console.log(error));
// db.Language.deleteMany({})
//   .then(res => console.log(res))
//   .catch(error => console.log(error));

setInterval(function() {
  axios
    .post(`${url}/articles`)
    .then(res => console.log(res.data))
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    });

  axios
    .post(`${url}/authors`)
    .then(res => console.log(res.data))
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    });
  console.log("Requesting...");
}, duration);

// port
const PORT = process.env.PORT || 5000;
// listen
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
