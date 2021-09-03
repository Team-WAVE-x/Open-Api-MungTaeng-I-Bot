const fs = require('fs')
const { prefix, token } = require('./settings.json')
const { Client, Intents, Collection } = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.commands = new Collection()

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready', () => {
  client.user.setActivity(':help')
  console.log('On')
})

client.on('message', async (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const [command, ...args] = message.content.slice(prefix.length).trim().split(/ +/)

  if (!client.commands.has(command)) return

  await client.commands.get(command).execute(message, args)
    .catch(console.error)
})

client.login(token)
