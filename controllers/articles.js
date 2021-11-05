const Article = require('../models/article');
const Author = require('../models/author');
const moment = require('moment');
const ErrorHandler = require('../utils/errorHandler');

// loggers
const { successlog, errorlog } = require('../utils/logger');

const { dataCollector } = require('../lib/collector');

async function articleCreateLogic(article, articles = []) {
  // destructure
  const { href, date } = article;

  // let authors = [];
  // check if author name exists in author db
  // const authorExists = await Author.findOne({ name: author.name });
  // if exists - get author id , else create author then get author id
  // if (authorExists) {
  //   const { id } = authorExists;

  //   authors.push(id);
  // } else {
  //   const newAuthor = await Author.create({ ...author });

  //   authors.push(newAuthor.id);
  // }

  // check if article exists
  const articleExists = await Article.findOne({ link: href });

  // if article exists skip else create new article !null - not null
  if (!articleExists) {
    // create new articles
    const newArticle = await Article.create({
      ...article,
      link: href,
      datePublished: date,
    });

    // push to array
    articles.push(newArticle);

    successlog.info(
      `[ARTICLES:CREATE]: New article created on ${moment().format('LLLL')}`,
    );
  }
}

exports.createArticle = async () => {
  try {
    const data = await dataCollector();
    const articles = [];

    for (let article of data) {
      await articleCreateLogic(article, articles);
    }

    successlog.info(
      `[ARTICLES:CREATE]: Request to articles:create on ${moment().format(
        'LLLL',
      )} was successful`,
    );

    return true;
  } catch (error) {
    console.log('error', error);
    errorlog.info(error);
    return false;
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    return res.status(200).json(res.advancedResults);
  } catch (error) {
    next(error);
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({
      link: req.params.link,
    });

    if (!article) {
      return next(
        new ErrorHandler(`Article ${req.params.link} not found`, 404),
      );
    }

    return res.status(200).json(article);
  } catch (error) {
    next(new ErrorHandler(`Article ${req.params.link} not found`, 404));
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findOneAndUpdate(
      { link: req.params.link },
      req.body,
    );

    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    await Article.findOneAndDelete({ link: req.params.link });
    return res.status(200).json({
      message: 'Article deleted',
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Oops. Something went wrong. Not deleted.',
    });
  }
};
