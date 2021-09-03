const { get } = require('superagent')
const { MessageEmbed } = require('discord.js')
const { NaverClientId, NaverClientSecret } = require('../settings.json')

module.exports = {
  name: '쇼핑',
  async execute (message, args) {
    const res = await get('https://openapi.naver.com/v1/search/shop.json?query=' + args[1])
      .set('X-Naver-Client-Id', NaverClientId)
      .set('X-Naver-Client-Secret', NaverClientSecret)

    const embed = new MessageEmbed({
      title: `*${args[1]}* 의 쇼핑 정보입니다`,
      color: 0x0099ff
    })

    for (const data of res.body.items) {
      embed.addField(
        data.title.replace('<b>', '').replace('</b>', ''),
        JSON.stringify(data.category1).replace(/"/gi, '') +
          '/' + JSON.stringify(data.category2).replace(/"/gi, '') +
          '/' + JSON.stringify(data.category3).replace(/"/gi, '') +
          '\n' + JSON.stringify(data.link).replace(/"/gi, '') +
          '\n최저가: ' + JSON.stringify(data.lprice).replace(/"/gi, '')
      )
    }

    message.channel.send(embed)
  }
}
