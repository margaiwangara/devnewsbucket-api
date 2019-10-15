const cheerio = require("cheerio");
const { getHtml } = require("./requestor");

// helpers
const { dateToDBFormat } = require("./helpers");

exports.laravelExtractor = html => {
  // load data to cheerio
  const $ = cheerio.load(html);

  const store = [];
  $(".card--post").each(async function(i, el) {
    const $element = $(el);

    const $image = $element.find(".post__image a img");
    const $date = $element.find(".post__content span > span:last-child");
    const $link = $element.find(".post__content h2 a");
    const $title = $element.find(".post__content h2 a");
    const $content = $element.find(".post__content p");
    const $authorGravatar = $element.find(".post__author img");
    const $authorName = $element.find(".post__author .author__content h4 a");

    store.push({
      image: $image.attr("src"),
      date: dateToDBFormat($date.text()),
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
    });
  });

  return store;
};
