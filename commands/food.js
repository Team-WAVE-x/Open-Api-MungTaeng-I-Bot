const { MessageEmbed } = require('discord.js');
var request = require('request');
const { KEY } = require("../settings.json");
let restrts2 = [];
 
 

module.exports = {
  name: "맛집",
  execute(message) {
    const args = message.content.split(" ");

    request(encodeURI('https://openapi.gg.go.kr/PlaceThatDoATasteyFoodSt?SIGUN_NM=' + `${args[1]}` + '&Type=json&pSize=5&KEY='+KEY), function (error, response) {
      if (error) throw new Error(error);
      if (response.body == '{"RESULT":{"CODE":"INFO-200","MESSAGE":"해당하는 데이터가 없습니다."}}') return message.channel.send('와 샌즈');
      console.log(response.body)
      let restrts = JSON.parse(response.body).PlaceThatDoATasteyFoodSt[1];
      restrts2[0] = JSON.stringify(restrts.row[0].RESTRT_NM).replace(/\"/gi, "")//나중에 for로  묶을꺼
      restrts2[1] = JSON.stringify(restrts.row[1].RESTRT_NM).replace(/\"/gi, "")
      restrts2[2] = JSON.stringify(restrts.row[2].RESTRT_NM).replace(/\"/gi, "")
      restrts2[3] = JSON.stringify(restrts.row[3].RESTRT_NM).replace(/\"/gi, "")
      restrts2[4] = JSON.stringify(restrts.row[4].RESTRT_NM).replace(/\"/gi, "")

      const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('**' + `${args[1]}` + ' 맛집' + '**')
        .addFields(
          { name: restrts2[0], value: 'asdf'},
          { name: restrts2[1], value: 'asdf'},
          { name: restrts2[2], value: 'asdf'},
          { name: restrts2[3], value: 'asdf'},
          { name: restrts2[4], value: 'asdf'}
        )
        .setTimestamp()
        .setFooter('Mungtengyee');


      return message.channel.send({ embeds: [exampleEmbed] });
    });
  }
};