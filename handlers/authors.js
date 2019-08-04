const db = require("../models");
const { scrapCollection } = require("../scraper");

exports.createAuthor = async (req, res, next) => {
  try {
    const data = await scrapCollection();
    let authors = [];

    for (let value of data) {
      // destructure author from pile
      const { author } = value;

      // check if author already exists
      const existAuthor = await db.Author.findOne({ name: author.name });
      if (!existAuthor) {
        authors.push(author);
      }
    }

    const newAuthor = await db.Author.insertMany(authors);
    return res.status(201).json(newAuthor);
  } catch (error) {
    return next(error);
  }
};

exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await db.Author.find({});
    return res.status(200).json(authors);
  } catch (error) {
    return next(error);
  }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const author = await db.Author.findOne({ name: req.params.name });

    return res.status(200).json(author);
  } catch (error) {
    return next({
      status: 404,
      message: "Not Found"
    });
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const author = await db.Author.findOneAndUpdate(
      { name: req.params.name },
      req.body
    );

    return res.status(200).json(author);
  } catch (error) {
    return next(error);
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    await db.Author.findOneAndDelete({ name: req.params.name });
    return res.status(200).json({
      message: "Author deleted"
    });
  } catch (error) {
    return next({
      status: 500,
      message: "Oops. Something went wrong. Not deleted."
    });
  }
};
