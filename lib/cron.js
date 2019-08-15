const cron = require("node-cron");
const { runCreateArticleCron } = require("./service");

cron.schedule("0 */4 * * *", () => {
  console.log("Requesting...");
  runCreateArticleCron();
});

