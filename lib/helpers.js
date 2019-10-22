const moment = require("moment");

exports.dateToDBFormat = date =>
  moment(date.toString(), "MMMM Do YYYY").format();

exports.range = n => Array.from(Array(n).keys());
