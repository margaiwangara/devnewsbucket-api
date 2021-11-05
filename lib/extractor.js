const cheerio = require('cheerio');
const axios = require('axios');

// helpers
const { dateToDBFormat } = require('./helpers');

exports.laravelExtractor = (html) => {
  // load data to cheerio
  const $ = cheerio.load(html);
  const elements = [];

  $('.card').each((i, el) => elements.push(el));

  return extractFiles(elements, html).then((data) => data);
};

async function extractFiles(elements, html) {
  const $ = cheerio.load(html);
  const store = [];
  try {
    for (let el of elements) {
      const $element = $(el);

      const $link = $element.find('a');
      const $image = $element.find('a img');
      const $date = $element.find('a p:first-of-type');
      const $title = $element.find('a p:last-of-type span');
      // const $authorGravatar = $element.find('.post__author img');
      // const $authorName = $element.find('.post__author .author__content h4 a');

      // link testor
      const link = $link ? $link.attr('href').replace('/', '') : '';

      const { summary, content } = await laravelSingleExtractor(link);

      store.push({
        image: $image.attr('src'),
        date: dateToDBFormat($date.text()),
        href: link,
        title: $title.text().replace(/[\n]/g, ''),
        summary: summary ? summary.replace(/ +/g, ' ') : '',
        content,
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
    const response = await axios.get(`https://laravel-news.com/${link}`);

    return response.data;
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

    const $element = $('.prose-sm.prose');
    const $summary = $element.find('p:first-of-type');

    return {
      content: $('.prose-sm.prose').html().trim(),
      summary: $summary.text().trim(),
    };
  } catch (error) {
    console.log(error);
  }
}

// End of Laravel Extractor
