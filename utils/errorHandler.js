class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.status = statusCode;
  }
}

module.exports = ErrorHandler;
