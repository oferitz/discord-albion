const path = require("path");
const events = require("../controllers/events");
const kills = require("../controllers/kills");

module.exports = app => {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  app.get("/events", events);
  app.get("/kills/:eventId", kills);
};
