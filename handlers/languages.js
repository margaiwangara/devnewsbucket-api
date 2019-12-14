const db = require("../models");

exports.createLanguage = async (req, res, next) => {
  try {
    const newLanguage = await db.Language.create(req.body);

    return res.status(201).json(newLanguage);
  } catch (error) {
    return next(error);
  }
};

exports.getLanguages = async (req, res, next) => {
  try {
    return res.status(200).json(res.advancedResults);
  } catch (error) {
    return next(error);
  }
};

exports.getLanguage = async (req, res, next) => {
  try {
    const language = await db.Language.findOne({ name: req.params.name });

    return res.status(200).json(language);
  } catch (error) {
    return next({
      status: 404,
      message: "Not Found"
    });
  }
};

exports.updateLanguage = async (req, res, next) => {
  try {
    const language = await db.Language.findOneAndUpdate(
      { name: req.params.name },
      req.body
    );

    return res.status(200).json(language);
  } catch (error) {
    return next(error);
  }
};

exports.deleteLanguage = async (req, res, next) => {
  try {
    await db.Language.findOneAndDelete({ name: req.params.name });
    return res.status(200).json({
      message: "Language deleted"
    });
  } catch (error) {
    return next({
      status: 500,
      message: "Oops. Something went wrong. Not deleted."
    });
  }
};
