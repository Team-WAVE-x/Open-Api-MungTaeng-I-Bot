const { get } = require('superagent')
const { covid19 } = require('../settings.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: '코로나',
  async execute (message) {
    const res = await get('https://api.corona-19.kr/korea/?serviceKey=' + covid19)

    console.log(res.body.TotalCase)
    const embed = new MessageEmbed({
      color: 0x0099ff,
      title: '코로나19 현황',
      footer: { text: 'Mungteng-I' },
      fields: [
        { name: '누적 확진자', value: res.body.TotalCase + '(명)' },
        { name: '누적 완치자', value: res.body.TotalRecovered + '(명)' },
        { name: '누적 사망자', value: res.body.TotalDeath + '(명)' },
        { name: '격리, 치료중인 확진자', value: res.body.NowCase + '(명)' }
      ]
    })

    message.channel.send(embed)
  }
}
