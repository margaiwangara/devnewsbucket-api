const express = require("express");
const app = express();

// Imports
const errorHandler = require("./handlers/errors");
const authorRoutes = require("./routes/authors");
const articleRoutes = require("./routes/articles");

app.get("/", (req, res) => {
  res.render("<h1>Welcome To DevNewsBucket</h1>");
});

// port
const PORT = process.env.PORT || 5000;

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
app.use(errorHandler);

// listen
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
