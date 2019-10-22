const cron = require("node-cron");
const moment = require("moment");

const { runCreateArticleCron } = require("./service");

// loggers
const { successlog } = require("../utils/logger");

cron.schedule("0 */4 * * *", async () => {
  try {
    successlog.info(`[CRON]: Request made on ${moment().format("LLLL")}`);

    await runCreateArticleCron();
    console.log("cron running");
  } catch (error) {
    console.log(error);
  }
});
