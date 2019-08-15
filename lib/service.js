const { dataCollector } = require("./collector");
const db = require("../models");
const moment = require("moment");

exports.runCreateArticleCron = async () => {
  try {
    const data = await dataCollector();
    const articles = [];
    for (let article of data) {
      // destructure
      const { link, content, date, request } = article;

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

        // add request to database
        const newRequest = await db.Request.create({
          name: request.name,
          description: `Request made on ${moment(Date.now()).format(
            "LLLL"
          )}. Records Added`
        });
      }
    }

    // add request to database
    const newRequest = await db.Request.create({
      name: "confirmation-request",
      description: `Request made on ${moment(Date.now()).format("LLLL")}`
    });
    console.log({
      data: articles,
      newRequest
    });
  } catch (error) {
    console.log(error);
  }
};
