const cheerio = require('cheerio');
const axios = require('axios');

// helpers
const { dateToDBFormat } = require('./helpers');

exports.laravelExtractor = (html) => {
  // load data to cheerio
  const $ = cheerio.load(html);
  const elements = [];

  $('.card--post').each((i, el) => elements.push(el));

  return extractFiles(elements, html).then((data) => data);
};

async function extractFiles(elements, html) {
  const $ = cheerio.load(html);
  const store = [];
  try {
    for (let el of elements) {
      const $element = $(el);

      const $image = $element.find('.post__image a img');
      const $date = $element.find('.prose span > span:last-child');
      const $link = $element.find('.prose h2 a');
      const $title = $element.find('.prose h2 a');
      const $summary = $element.find('.prose p');
      const $authorGravatar = $element.find('.post__author img');
      const $authorName = $element.find('.post__author .author__content h4 a');

      // link testor
      const link = $link ? $link.attr('href').replace('/', '') : '';

      const content = await laravelSingleExtractor(link);

      store.push({
        image: $image.attr('src'),
        date: dateToDBFormat($date.text()),
        link,
        title: $title.text(),
        summary: $summary.text(),
        content,
        author: {
          gravatar: $authorGravatar.attr('src'),
          name: $authorName.text(),
        },
        language: {
          name: 'php',
          framework: 'laravel',
        },
      });
    }

    return store;
  } catch (error) {
    console.log(error);
  }
}

async function asyncforEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

async function laravelSingleLink(link) {
  try {
    const { data } = await axios.get(`https://laravel-news.com/${link}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function laravelSingleExtractor(link) {
  try {
    const html = await laravelSingleLink(link);

    const $ = cheerio.load(html);

    // remove elements
    $('.hidden').remove();
    $('p.text-sm').remove();
    $('hr').remove();
    $('header').remove();

    return $('.prose').html().trim();
  } catch (error) {
    console.log(error);
  }
}

// End of Laravel Extractor
