const express = require("express");

const router = express.Router();

/**
 * @route GET /
 * @desc Home route for app
 * @access Public
 */
router.get("/", async (req, res, next) => {
  try {
    return res.render("home");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
