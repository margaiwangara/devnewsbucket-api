const axios = require("axios");

exports.getHtml = async url => {
  try {
    const { data: html } = await axios.get(url);
    return html;
  } catch (error) {
    console.log(error);
  }
};
