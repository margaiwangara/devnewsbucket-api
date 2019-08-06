const config = require("config");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY | config.get("secretKey");
// authentication - check if user is logged in
exports.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1];
    jwt.verify(token, secretKey, (error, payload) => {
      if (payload) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in to access this service"
        });
      }
    });
  } catch (error) {
    return next({
      status: 401,
      message: "Please login to access this service"
    });
  }
};

// authorization - permission to CRUD
exports.userAuthorized = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1];
    jwt.verify(token, secretKey, (error, payload) => {
      if (payload && payload.id == req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized access"
        });
      }
    });
  } catch (error) {
    return next({
      error: 401,
      message: "Unauthorized access"
    });
  }
};
