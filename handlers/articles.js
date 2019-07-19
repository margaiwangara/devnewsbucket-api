const db = require("../models");
const { scrapCollection } = require("../scraper");

exports.createArticle = async (req, res, next) => {
  try {
    const data = await scrapCollection();
    data.forEach(async article => {
      try {
        const { author } = article;
        const { title, image, link, content, date } = article;

        // check if article exists
        const articleExists = await db.Article.findOne({ link });
        if (!articleExists) {
          // if doesn't exist find author id
          const articleAuthor = await db.Author.findOne({ name: author.name });
          if (articleAuthor) {
            // if exists add to articles
            const newArticle = await db.Article.create({
              title,
              image,
              link,
              summary: content,
              author: articleAuthor.id,
              datePublished: date
            });

            return res.status(200).json(newArticle);
          }
        }
      } catch (error) {
        return next(error);
      }
    });
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
    }).populate("author", {
      name: true,
      gravatar: true
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
