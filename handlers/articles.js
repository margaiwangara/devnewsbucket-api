const db = require("../models");
const moment = require("moment");

// loggers
const { successlog, errorlog } = require("../utils/logger");

const { dataCollector } = require("../lib/collector");

exports.createArticle = async (req, res, next) => {
  try {
    const data = await dataCollector();
    const articles = [];
    for (let article of data) {
      // destructure
      const { link, date, author } = article;

      let authors = [];
      // check if author name exists in author db
      const authorExists = await db.Author.findOne({ name: author.name });
      // if exists - get author id , else create author then get author id
      if (authorExists) {
        const { id } = authorExists;

        authors.push(id);
      } else {
        const newAuthor = await db.Author.create({ ...author });

        authors.push(newAuthor.id);
      }

      // check if article exists
      const articleExists = await db.Article.findOne({ link });

      // if article exists skip else create new article !null - not null
      if (articleExists == null) {
        // create new articles
        const newArticle = await db.Article.create({
          ...article,
          authors,
          datePublished: date
        });

        // push to array
        articles.push(newArticle);

        successlog.info(
          `[ARTICLES:CREATE]: New article created on ${moment().format("LLLL")}`
        );
      }
    }

    successlog.info(
      `[ARTICLES:CREATE]: Request to articles:create on ${moment().format(
        "LLLL"
      )} was successful`
    );
    return articles;
  } catch (error) {
    errorlog.info(error);
    return next(error);
  }
};

exports.getArticles = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const pageSize = limit && limit >= 1 ? limit : 4;
  const currentPage = page && page >= 1 ? page : 1;

  try {
    const articles = await db.Article.find({})
      .sort({ datePublished: -1 })
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
      .populate("authors");
    const noOfArticles = await db.Article.countDocuments();

    res.setHeader("max-records", noOfArticles);
    return res.status(200).json({
      totalItems: noOfArticles,
      data: articles,
      itemsPerPage: pageSize,
      noOfPages: Math.ceil(noOfArticles / pageSize)
    });
  } catch (error) {
    return next(error);
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await db.Article.findOne({
      link: req.params.link
    });

    return res.status(200).json(article);
  } catch (error) {
    return next({
      status: 404,
      message: "Not Found"
    });
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const article = await db.Article.findOneAndUpdate(
      { link: req.params.link },
      req.body
    );

    return res.status(200).json(article);
  } catch (error) {
    return next(error);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    await db.Article.findOneAndDelete({ link: req.params.link });
    return res.status(200).json({
      message: "Article deleted"
    });
  } catch (error) {
    return next({
      status: 500,
      message: "Oops. Something went wrong. Not deleted."
    });
  }
};
