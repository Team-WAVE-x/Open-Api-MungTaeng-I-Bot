const { MessageEmbed } = require('discord.js');
const request = require('request');
const { covid19 } = require("../settings.json");

module.exports = {
    name: "코로나",
    execute(message) {
        var options = {
            'method': 'GET',
            'url': encodeURI('https://api.corona-19.kr/korea/?serviceKey=' + covid19),
            'headers': {

            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let covid19json = JSON.parse(response.body);
            console.log(JSON.parse(response.body).TotalCase);
            var Embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('코로나19 현황')
                .setColor('#0099ff')
                .addFields(
                    {name: '누적 확진자', value: covid19json.TotalCase+'(명)'},
                    {name: '누적 완치자', value: covid19json.TotalRecovered+'(명)'},
                    {name: '누적 사망자', value: covid19json.TotalDeath+'(명)'},
                    {name: '격리, 치료중인 확진자', value: covid19json.NowCase+'(명)'})
                    .setTimestamp()
                    .setFooter('Mungteng-I');
                return message.channel.send({ embeds: [Embed] });
        });
    }
}