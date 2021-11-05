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
    const html = await getHtml(`${URL}`);

    const laravelArticle = await laravelExtractor(html);

    store.push(...laravelArticle);

    // for (let n of range(5)) {
    // }

    // const html = await getHtml(URL);
    // const laravelArticle = await laravelExtractor(html);
    // return laravelArticle;
    return store;
  } catch (error) {
    console.log(error);
  }
};
