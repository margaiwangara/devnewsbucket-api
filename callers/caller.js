const axios = require("axios");

exports.callArticles = async (req, res) => {
  try {
    // make post request
    const article = await axios.post("/api/articles");

    return res.json(article);
  } catch (error) {
    return res.json(error);
  }
};
