const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createLanguage,
  updateLanguage,
  getLanguage,
  getLanguages,
  deleteLanguage
} = require("../handlers/languages");

// middleware
const advancedResults = require("../middlewares/advancedResults");
const Language = require("../models/language");

router
  .route("/")
  .get(advancedResults(Language), getLanguages)
  .post(createLanguage);

router
  .route("/:name")
  .get(getLanguage)
  .put(updateLanguage)
  .delete(deleteLanguage);

module.exports = router;
