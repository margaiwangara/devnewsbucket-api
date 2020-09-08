const { getHtml } = require('./requestor');
const { laravelExtractor } = require('./extractor');
const { range } = require('./helpers');
const Article = require('../models/article');

exports.saveLaravelArticles = async () => {
  const store = [];
  try {
    const totalDocs = Article.countDocuments();
    const countRange = totalDocs < 500 ? 50 : 5;
    const URL = 'https://laravel-news.com/category/news';
    for (let n of range(countRange)) {
      const html = await getHtml(`${URL}?page=${n + 1}`);
      const laravelArticle = await laravelExtractor(html);

      store.push(...laravelArticle);
    }

    // const html = await getHtml(URL);
    // const laravelArticle = await laravelExtractor(html);
    // return laravelArticle;
    return store;
  } catch (error) {
    console.log(error);
  }
};
