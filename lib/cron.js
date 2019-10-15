const cron = require("node-cron");
const moment = require("moment");

const { runCreateArticleCron } = require("./service");

// loggers
const { successlog } = require("../utils/logger");

cron.schedule("0 */4 * * *", () => {
  successlog.info(`[CRON]: Request made on ${moment().format("LLLL")}`);

  runCreateArticleCron();
});
