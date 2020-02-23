const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
} = require("../controllers/authors");

// middleware
const { userAuthorized, roleAuthorized } = require("../middleware/auth");
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
  .put(userAuthorized, roleAuthorized("admin"), updateAuthor)
  .delete(userAuthorized, roleAuthorized("admin"), deleteAuthor);

module.exports = router;
