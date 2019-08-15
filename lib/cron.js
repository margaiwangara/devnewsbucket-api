const cron = require("node-cron");
const { runCreateArticleCron } = require("./service");

cron.schedule("* * * * *", () => {
  console.log("Requesting...");
  runCreateArticleCron();
});

cron.schedule("*/1 * * * *", () => {
	console.log("Loading...");
});
