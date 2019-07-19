const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} = require("../handlers/articles");

router
  .route("/")
  .post(createArticle)
  .get(getArticles);

router
  .route("/:link")
  .get(getArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = router;
