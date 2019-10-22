const { getHtml } = require("./requestor");
const { laravelExtractor } = require("./extractor");
const { range } = require("./helpers");

exports.saveLaravelArticles = async () => {
  let URL = `https://laravel-news.com/category/news`;
  const store = [];
  try {
    // for (let n of range(10)) {
    //   let URL = `https://laravel-news.com/category/news?page=${n + 1}`;
    //   const html = await getHtml(URL);
    //   const laravelArticle = await laravelExtractor(html);

    //   store.push(...laravelArticle);
    // }

    const html = await getHtml(URL);
    const laravelArticle = await laravelExtractor(html);
    return laravelArticle;
  } catch (error) {
    console.log(error);
  }
};
