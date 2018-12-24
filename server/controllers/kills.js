const { EVENTS_COLL_NAME, KILLS_COLL_NAME } = require("../config");
const {
  findAndSort,
  findOne,
  findAndCount,
  aggregate,
  aggregateTop
} = require("../service/DB");
const { getCurrentEventId } = require("../event");
module.exports = async (req, res, next) => {
  try {
    const reqParams = req.params;
    let eventId =
      reqParams.eventId !== "0" ? reqParams.eventId : await getCurrentEventId();

    if (!eventId) {
      eventId = await findAndSort({
        collection: EVENTS_COLL_NAME,
        sortBy: { end: -1 }
      });
    }
    const event = await findOne(EVENTS_COLL_NAME, { eventId });
    const history = await findAndSort({
      collection: KILLS_COLL_NAME,
      match: { eventId },
      sortBy: { ts: -1 }
    });
    const totalRedKills = await findAndCount({
      collection: KILLS_COLL_NAME,
      match: { eventId, guild: "Red" }
    });
    const totalBlueKills = await findAndCount({
      collection: KILLS_COLL_NAME,
      match: { eventId, guild: "Blue" }
    });
    const totalFame = await aggregate({
      collection: KILLS_COLL_NAME,
      match: { eventId },
      group: { _id: "$guild", total: { $sum: "$fame" } }
    });

    let totalFameRed = totalFame.find(i => i._id === "Red");
    let totalFameBlue = totalFame.find(i => i._id === "Blue");
    if (!totalFameRed) {
      totalFameRed = { total: 0 };
    }
    if (!totalFameBlue) {
      totalFameBlue = { total: 0 };
    }
    const stats = [
      {
        guild: "Red",
        kills: totalRedKills,
        deaths: totalBlueKills,
        fame: totalFameRed.total
      },
      {
        guild: "Blue",
        kills: totalBlueKills,
        deaths: totalRedKills,
        fame: totalFameBlue.total
      }
    ];
    const topPlayers = await aggregateTop({
      collection: KILLS_COLL_NAME,
      match: { eventId },
      group: {
        _id: "$killer",
        kills: { $sum: 1 },
        guild: { $first: "$guild" },
        totalFame: { $sum: "$fame" }
      },
      sort: { totalFame: -1 },
      limit: 5
    });

    const info = {
      playersKilled: totalRedKills + totalBlueKills,
      totalFame: totalFameRed.total + totalFameBlue.total,
      eventStartTime: event.start,
      eventEndTime: event.end
    };
    return res.status(200).json({ info, history, stats, topPlayers });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};
