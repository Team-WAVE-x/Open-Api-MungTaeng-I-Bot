const { get } = require('superagent')
const { MessageEmbed } = require('discord.js')
const { restaurantKEY } = require('../settings.json')

module.exports = {
  name: '맛집',
  async execute (message, args) {
    const url = new URL('https://openapi.gg.go.kr/PlaceThatDoATasteyFoodSt')

    url.searchParams.set('SIGUN_NM', args[1])
    url.searchParams.set('Type', 'json')
    url.searchParams.set('pSize', '100')
    url.searchParams.set('KEY', restaurantKEY)

    const res = await get(url)

    if (res.text.includes('해당하는 데이터가 없습니다.')) {
      message.channel.send('데이터가 없습니다')
      return
    }

    const datas = res.body.PlaceThatDoATasteyFoodSt[1].row
    const embed = new MessageEmbed({ color: 0x0099ff })

    for (const data of datas) {
      embed.addField(
        data.RESTRT_NM.replace(/"/gi, ''),
        '*주메뉴* :' +
          data.REPRSNT_FOOD_NM.replace(/"/gi, '') + '\n```' +
          data.REFINE_ROADNM_ADDR.replace(/"/gi, '') + '\n' +
          data.TASTFDPLC_TELNO.replace(/"/gi, '') + '```'
      )
    }

    message.channel.send(embed)
  }
}
