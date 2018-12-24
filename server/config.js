module.exports = {
  PORT: 7861,
  BOT_PREFIX: "!",
  BLUE_ROLE_ID: process.env.BLUE_ROLE_ID,
  RED_ROLE_ID: process.env.RED_ROLE_ID,
  BOT_TOKEN: process.env.BOT_TOKEN,
  DB_URL: process.env.DB_URL || "mongodb://localhost:47017",
  DB_NAME: "albion_discord",
  KILLS_COLL_NAME: "kills",
  EVENTS_COLL_NAME: "events",
  ALLOWED_BOT_USERS: process.env.ALLOWED_BOT_USERS || ["oferitz"]
};
