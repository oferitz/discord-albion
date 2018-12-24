const { EVENTS_COLL_NAME } = require('../config')
const { findAndSort } = require('../service/DB')

module.exports = async (req, res, next) => {
	try {
		const events = await findAndSort({
			collection: EVENTS_COLL_NAME,
			sortBy: { start: -1 }
		})
		return res.status(200).json(events)
	} catch (err) {
		next(err)
	}
}
