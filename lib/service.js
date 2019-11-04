const { dataCollector } = require("./collector");
const db = require("../models");
const moment = require("moment");

// loggers
const { successlog, errorlog } = require("../utils/logger");

exports.runCreateArticleCron = async () => {
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
  }
};
