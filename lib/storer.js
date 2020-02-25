const { getHtml } = require('./requestor');
const { laravelExtractor } = require('./extractor');
const { range } = require('./helpers');

exports.saveLaravelArticles = async () => {
  const store = [];
  try {
    for (let n of range(5)) {
      let URL = `https://laravel-news.com/category/news?page=${n + 1}`;
      const html = await getHtml(URL);
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
