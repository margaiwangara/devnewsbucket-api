const moment = require("moment");

exports.dateToDBFormat = date =>
  moment(date.toString(), "MMMM Do YYYY").format();

