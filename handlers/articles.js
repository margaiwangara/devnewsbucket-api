const db = require("../models");
const { scrapCollection } = require("../scraper");

exports.createArticle = async (req, res, next) => {
  try {
    const data = await scrapCollection();
    let articles = [];
    for (let article of data) {
      const { title, image, link, content, date, author } = article;

      // check if article exists
      const articleExists = await db.Article.findOne({ link });
      if (!articleExists) {
        // push to articles
        // create article
        const newArticle = await db.Article.create({
          title,
          image,
          link,
          summary: content,
          author: author,
          language: "laravel",
          datePublished: date
        });

        // push newArticles to article
        articles.push(newArticle);
      }
    }

    
    return res.status(200).json(articles);
  } catch (error) {
    return next(error);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await db.Article.find({});
    return res.status(200).json(articles);
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
