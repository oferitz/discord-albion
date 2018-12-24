const express = require("express");
const { initDB } = require("./service/DB");
const discordClient = require("./service/discord");
const middleware = require("./middleware");
const routes = require("./routes");
const { PORT } = require("./config");

const app = express();

initDB().then(db => {
  discordClient.init();
});

middleware(app);
routes(app);
app.listen(PORT, () => {
  console.log(`*** Server is running on port ${PORT}`);
});
