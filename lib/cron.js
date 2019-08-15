const cron = require("node-cron");
const { runCreateArticleCron, runCollector } = require("./service");

cron.schedule("0 */4 * * *", () => {
  console.log("Requesting...");
  runCreateArticleCron();
});
