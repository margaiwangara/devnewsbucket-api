const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createLanguage,
  updateLanguage,
  getLanguage,
  getLanguages,
  deleteLanguage
} = require("../controllers/languages");

// middleware
const { userAuthorized, roleAuthorized } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Language = require("../models/language");

router
  .route("/")
  .get(advancedResults(Language), getLanguages)
  .post(createLanguage);

router
  .route("/:name")
  .get(getLanguage)
  .put(userAuthorized, roleAuthorized("admin"), updateLanguage)
  .delete(userAuthorized, roleAuthorized("admin"), deleteLanguage);

module.exports = router;
