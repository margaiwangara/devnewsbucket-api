const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articles');

// middleware
const { userAuthorized, roleAuthorized } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Article = require('../models/article');

router
  .route('/')
  .post(createArticle)
  .get(advancedResults(Article, 'authors'), getArticles);

router
  .route('/:link')
  .get(getArticle)
  .put(userAuthorized, roleAuthorized('admin'), updateArticle)
  .delete(userAuthorized, roleAuthorized('admin'), deleteArticle);

module.exports = router;
