const { getHtml } = require("./requestor");
const { laravelExtractor } = require("./extractor");

exports.saveLaravelArticles = async () => {
  const URL = "https://laravel-news.com/category/news?page=2";
  try {
    const html = await getHtml(URL);
    const laravelArticle = await laravelExtractor(html);

    return laravelArticle;
  } catch (error) {
    console.log(error);
  }
};
