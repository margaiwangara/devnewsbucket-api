const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
} = require("../handlers/authors");

// middleware
const advancedResults = require("../middlewares/advancedResults");
const Author = require("../models/author");

router
  .route("/")
  .post(createAuthor)
  .get(advancedResults(Author), getAuthors);

router
  .route("/:name")
  .get(getAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

module.exports = router;
