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
const advancedResults = require("../middleware/advancedResults");
const Author = require("../models/author");

router
  .route("/")
  .post(createAuthor)
  .get(
    advancedResults(Author, {
      path: "articles",
      select: "title summary datePublished"
    }),
    getAuthors
  );

router
  .route("/:name")
  .get(getAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

module.exports = router;
