const { MessageEmbed } = require('discord.js');
var request = require('request');
const { KEY } = require("../settings.json");
let i = 0;

module.exports = {
  name: "맛집",
  execute(message) {
    const args = message.content.split(" ");
    i = 0
    request(encodeURI('https://openapi.gg.go.kr/PlaceThatDoATasteyFoodSt?SIGUN_NM=' + `${args[1]}` + '&Type=json&' + 'pSize=100&KEY=' + KEY), function (error, response) {
      if (error) throw new Error(error);
      if (response.body == '{"RESULT":{"CODE":"INFO-200","MESSAGE":"해당하는 데이터가 없습니다."}}') return message.channel.send('와 샌즈');

      let restrts = JSON.parse(response.body).PlaceThatDoATasteyFoodSt[1];
      var exampleEmbed = new MessageEmbed().setTitle("맛집");
      while (i < restrts.row.length) {
        exampleEmbed.addFields(
          {
            name: restrts.row[i].RESTRT_NM.replace(/\"/gi, ""),
            value: "*주메뉴* :" + restrts.row[i].REPRSNT_FOOD_NM.replace(/\"/gi, "") + '\n```' + JSON.stringify(restrts.row[i].REFINE_ROADNM_ADDR).replace(/\"/gi, "")
              + '\n' + JSON.stringify(restrts.row[i].TASTFDPLC_TELNO).replace(/\"/gi, "") + '```'
          })
        i++
      }
      return message.channel.send({ embeds: [exampleEmbed] });
    });
  }
};