const Discord = require('discord.js')
const client = new Discord.Client()
const { startEvent, endEvent, resetEvent } = require('../event')
const { BOT_TOKEN, BOT_PREFIX, ALLOWED_BOT_USERS } = require('../config')

const discordClient = {
  async init() {
    console.log('*** Connecting to Discord...')
    await client.login(BOT_TOKEN)
  }
}

client.on('ready', msg => {
  console.log('*** Discord client is ready')
})

client.on('message', async message => {
  try {
    if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return
    if (!ALLOWED_BOT_USERS.includes(message.author.username)) return

    if (message.content === `${BOT_PREFIX}event start`) {
      let msg = '*** Event started - starting to track kills ***'
      console.log(msg)
      message.channel.send(msg)
      await startEvent(message)
    }

    if (message.content === `${BOT_PREFIX}event end`) {
      await endEvent()
      let msg = '*** Event ended - processing results ***'
      console.log(msg)
      message.channel.send(msg)
      resetEvent()
    }

    if (message.content === `${BOT_PREFIX}event new round`) {
      let msg = '*** Starting new round ***'
      console.log(msg)
      await endEvent()
      resetEvent()
      message.channel.send(msg)
      await startEvent(message)
    }
  } catch (e) {
    console.error(e.message)
    resetEvent()
  }
})

module.exports = discordClient
