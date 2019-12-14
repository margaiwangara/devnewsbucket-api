const db = require("../models");
const config = require("config");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || config.get("secretKey");
// access account
exports.accessAccount = async (req, res, next) => {
  try {
    // get users
    const user = await db.User.findOne({ email: req.body.email });
    const { id, email, name } = user;

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id,
          email
        },
        secretKey,
        {
          expiresIn: 3600
        }
      );

      return res.status(200).json({
        id,
        email,
        name,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email or Password"
      });
    }
  } catch (error) {}
};

// createaccount
exports.createAccount = async (req, res, next) => {
  try {
    // // check if email exists
    // const userExists = await db.User.findOne({ email });
    // if (userExists) {
    //   return res.status(400).json({
    //     message: "Email already exists"
    //   });
    // }

    // create user
    const newUser = await db.User.create(req.body);

    const { name, email, id } = newUser;
    const token = jwt.sign(
      {
        id,
        email
      },
      secretKey,
      {
        expiresIn: 3600
      }
    );
    return res.status(201).json({
      user: {
        name,
        email,
        id,
        token
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "Email is unavailable";
    }

    return next({
      status: 400,
      message: error.message
    });
  }
};
