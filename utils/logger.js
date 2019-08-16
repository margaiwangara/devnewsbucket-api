const winston = require("winston");
const winstonRotateFile = require("winston-daily-rotate-file");

// define custom log format
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// success logger
const successLogger = winston.loggers.add("successLogger", {
  format: logFormat,
  transports: [
    new winstonRotateFile({
      filename: "./logs/access-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "info"
    }),
    new winston.transports.Console({
      level: "info"
    })
  ]
});

// error logger
const errorLogger = winston.loggers.add("errorLogger", {
  format: logFormat,
  transports: [
    new winstonRotateFile({
      filename: "./logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error"
    }),
    new winston.transports.Console({
      level: "error"
    })
  ]
});

module.exports = {
  successlog: successLogger,
  errorlog: errorLogger
};
