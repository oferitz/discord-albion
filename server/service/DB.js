const { MongoClient } = require('mongodb')
const { DB_URL, DB_NAME, KILLS_COLL_NAME, EVENTS_COLL_NAME } = require('../config')

let db

async function initDB() {
  console.log('*** Connecting to local DB ...')
  try {
    const client = await MongoClient.connect(
      DB_URL,
      { useNewUrlParser: true }
    )
    db = client.db(DB_NAME)
    await db.createCollection(KILLS_COLL_NAME)
    await db.collection(KILLS_COLL_NAME).createIndex({ killId: 1 }, { unique: true })
    await db.collection(KILLS_COLL_NAME).createIndex({ eventId: 1 }, { unique: false })
    await db.createCollection(EVENTS_COLL_NAME)
    await db.collection(EVENTS_COLL_NAME).createIndex({ eventId: 1 }, { unique: true })
    console.log('*** Connected successfully to local DB')
    return db
  } catch (e) {
    console.error(e)
  }
}

async function findOne(collection, crit) {
  return db.collection(collection).findOne(crit)
}
async function findTop(collection, sort, top) {
  return db
    .collection(collection)
    .find()
    .sort(sort)
    .limit(top)
    .toArray()
}
async function insertOne(collection, doc) {
  return db.collection(collection).insertOne(doc)
}
async function updateOne(collection, match, set) {
  return db.collection(collection).updateOne(match, { $set: set })
}
async function findAndSort({ collection, match = {}, sortBy }) {
  return db
    .collection(collection)
    .find(match)
    .sort(sortBy)
    .toArray()
}
async function findAndCount({ collection, match = {} }) {
  return db
    .collection(collection)
    .find(match)
    .count()
}

async function aggregate({ collection, match = {}, group = {} }) {
  return db
    .collection(collection)
    .aggregate([
      {
        $match: match
      },
      {
        $group: group
      }
    ])
    .toArray()
}
async function aggregateTop({ collection, match = {}, group = {}, sort, limit }) {
  return db
    .collection(collection)
    .aggregate([
      {
        $match: match
      },
      {
        $group: group
      },
      { $sort: sort },
      { $limit: limit }
    ])
    .toArray()
}

module.exports = {
  db,
  initDB,
  findOne,
  findTop,
  insertOne,
  updateOne,
  findAndSort,
  findAndCount,
  aggregate,
  aggregateTop
}
