const axios = require('axios')

async function queryAPI(offset) {
  return await axios(`https://gameinfo.albiononline.com/api/gameinfo/events?limit=51&offset=${offset}`, {
    validateStatus: () => true
  })
}
module.exports = { queryAPI }
