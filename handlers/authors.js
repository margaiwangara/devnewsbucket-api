const db = require("../models");

// data collector
const { dataCollector } = require("../lib/collector");

exports.createAuthor = async (req, res, next) => {
  try {
    const data = await dataCollector();
    let authors = [];

    for (let value of data) {
      // destructure author from pile
      const { author } = value;

      // check if author already exists
      const existAuthor = await db.Author.findOne({ name: author.name });
      if (!existAuthor) {
        // create new author
        const newAuthor = await db.Author.create(author);
        authors.push(newAuthor);
      }
    }

    return res.status(201).json(authors);
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
