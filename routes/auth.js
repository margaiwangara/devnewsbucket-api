const express = require("express");
const router = express.Router({ mergeParams: true });

const { createAccount, accessAccount } = require("../handlers/auth");

router.post("/signup", createAccount);
router.post("/signin", accessAccount);

// router
//   .route("/:link")
//   .get(getArticle)
//   .put(updateArticle)
//   .delete(deleteArticle);

module.exports = router;
