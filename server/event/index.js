const shortid = require('shortid')
const albion = require('../service/albion')
const { toUTC } = require('../helpers')
const { insertOne, updateOne, findTop } = require('../service/DB')
const { BLUE_ROLE_ID, RED_ROLE_ID, KILLS_COLL_NAME, EVENTS_COLL_NAME } = require('../config')

let killsInterval
let currentOffset = 0
let currentEventId = '9gjQtTXOG'

function getKillId(ts, killer, victim) {
	return Buffer.from(`${ts}${killer}${victim}`).toString('base64')
}
async function getCurrentEventId() {
	const event = await findTop(EVENTS_COLL_NAME, { end: -1 }, 1)
	return event[0].eventId || '0'
}
// =====================================================================
// ACTIONS - addEvent                                                  =
// =====================================================================
async function addEvent(start) {
	try {
		currentEventId = shortid.generate()
		return await insertOne(EVENTS_COLL_NAME, {
			eventId: currentEventId,
			start
		})
	} catch (e) {
		console.info(e.message)
		return e.message
	}
}
// =====================================================================
// ACTIONS - addKill                                                   =
// =====================================================================
async function addKill({ killId, guild, ts, killer, victim, type, fame }) {
	try {
		return await insertOne(KILLS_COLL_NAME, {
			eventId: currentEventId,
			killId,
			guild,
			ts,
			killer,
			victim,
			type,
			fame
		})
	} catch (e) {
		console.info(e.message)
		return e.message
	}
}
// =====================================================================
// ACTIONS - startEvent                                                =
// =====================================================================
async function startEvent(message) {
	let eventStartTime = toUTC()
	// await addEvent(eventStartTime)
	let blueMembers = []
	let redMembers = []
	let membersWithRoleBlue = message.guild.roles.get(BLUE_ROLE_ID).members
	let membersWithRoleRed = message.guild.roles.get(RED_ROLE_ID).members

	for (let pair of membersWithRoleBlue) {
		blueMembers.push(pair[1].user.username)
	}
	for (let pair of membersWithRoleRed) {
		redMembers.push(pair[1].user.username)
	}

	console.log(`*** [BLUE] ${blueMembers.length} members`)
	console.log(`*** [RED] ${redMembers.length} members`)

	killsInterval = setInterval(async () => {
		console.log(`*** Searching for Blue/Red kills (offset: ${currentOffset})`)

		const res = await albion.queryAPI(currentOffset)
		if (res.data && !res.data.length) {
			currentOffset = 0
		} else {
			for (let d of res.data) {
				const { TimeStamp, Killer, Victim, Type } = d
				let killTime = toUTC(TimeStamp)
				if (killTime >= eventStartTime) {
					let killerName = Killer.Name
					let victimName = Victim.Name
					let blueRedKill = null

					if (blueMembers.includes(killerName) && redMembers.includes(victimName)) {
						blueRedKill = 'Blue'
					}
					if (redMembers.includes(killerName) && blueMembers.includes(victimName)) {
						blueRedKill = 'Red'
					}
					if (blueRedKill != null) {
						console.log('*** Found Blue/Red kill')
						let killId = getKillId(TimeStamp, killerName, Victim.Name)
						let killResult = await addKill({
							killId,
							guild: blueRedKill,
							ts: TimeStamp,
							killer: killerName,
							victim: Victim.Name,
							type: Type,
							fame: Killer.KillFame
						})
					}
				}
			}
			currentOffset = currentOffset + 50
		}
	}, 10000)
}
// =====================================================================
// ACTIONS - endEvent                                                  =
// =====================================================================
async function endEvent() {
	try {
		return await updateOne(EVENTS_COLL_NAME, { eventId: currentEventId }, { end: toUTC() })
	} catch (e) {
		console.info(e.message)
		return e.message
	}
}
// =====================================================================
// ACTIONS - reset                                                     =
// =====================================================================
function resetEvent() {
	clearInterval(killsInterval)
}
module.exports = { startEvent, endEvent, resetEvent, getCurrentEventId }
