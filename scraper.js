const fetch = require("node-fetch");
const cheerio = require("cheerio");
const moment = require("moment");

const articles = [];

const LaravelScrap = async page => {
  const url = `https://laravel-news.com/category/news`;

  try {
    const res = await fetch(url);
    const data = await res.text();

    const $ = cheerio.load(data);

    $(".card--post").each(function(i, el) {
      const $element = $(el);

      const $image = $element.find(".post__image a img");
      const $date = $element.find(".post__content span > span:last-child");
      const $link = $element.find(".post__content h2 a");
      const $title = $element.find(".post__content h2 a");
      const $content = $element.find(".post__content p");
      const $authorGravatar = $element.find(".post__author img");
      const $authorName = $element.find(".post__author .author__content h4 a");

      const article = {
        image: $image.attr("src"),
        date: moment($date.text(), "MMMM Do YYYY").format(),
        link: $link.attr("href").replace("/", ""),
        title: $title.text(),
        content: $content.text(),
        author: {
          gravatar: $authorGravatar.attr("src"),
          name: $authorName.text()
        },
        language: {
          name: "php",
          framework: "laravel"
        },
        request: {
          name: "php-laravel-request"
        }
      };

      articles.push(article);
    });
    // return articles;
  } catch (error) {
    console.log(error);
  }
};

exports.scrapCollection = async (req, res, next) => {
  try {
    await LaravelScrap();
    return articles;
  } catch (error) {
    console.log(error);
  }
};
