const { get } = require('superagent')

module.exports = {
  name: '강아지',
  async execute (message) {
    const res = await get('https://dog.ceo/api/breeds/image/random')
    message.channel.send(res.message)
  }
}
