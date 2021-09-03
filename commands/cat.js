const { get } = require('superagent')

module.exports = {
  name: '고양이',
  async execute (message) {
    const res = await get('https://api.thecatapi.com/v1/images/search')
    message.channel.send(res.body[0].url)
  }
}
