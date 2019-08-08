const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createLanguage,
  updateLanguage,
  getLanguage,
  getLanguages,
  deleteLanguage
} = require("../handlers/languages");

router
  .route("/")
  .get(getLanguages)
  .post(createLanguage);

router
  .route("/:name")
  .get(getLanguage)
  .put(updateLanguage)
  .delete(deleteLanguage);

module.exports = router;
