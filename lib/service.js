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
      const { link, content, date } = article;

      // check if article exists
      const articleExists = await db.Article.findOne({ link });
      if (!articleExists) {
        // push to articles
        // create articles
        const newArticle = await db.Article.create({
          ...article,
          summary: content,
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
