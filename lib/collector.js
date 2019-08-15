const { saveLaravelArticles } = require("./storer");

exports.dataCollector = async () => {
  try {
    const laravel = await saveLaravelArticles();

    return [...laravel];
  } catch (error) {
    console.log(error);
  }
};
