const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
} = require("../handlers/authors");

router
  .route("/")
  .post(createAuthor)
  .get(getAuthors);

router
  .route("/:name")
  .get(getAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

module.exports = router;
