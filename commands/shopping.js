const { MessageEmbed } = require('discord.js');
const request = require('request');
const { NaverClientId, NaverClientSecret } = require("../settings.json");
let i=0

module.exports = {
    name: "쇼핑",
    execute(message) {
        const args = message.content.split(" ");

        var options = {
            'method': 'GET',
            'url': encodeURI('https://openapi.naver.com/v1/search/shop.json?query=' + `${args[1]}`),
            'headers': {
                'X-Naver-Client-Id': NaverClientId,
                'X-Naver-Client-Secret': NaverClientSecret
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            const shopjson = JSON.parse(response.body);
           //console.log(shopjson.items[0]);
           var Embed = new MessageEmbed().setTitle('*' + `${args[1]}` + '* 의 쇼핑 정보입니다').setColor('#0099ff');
            i = 0;
            while (i < shopjson.items.length) {

                    Embed.addFields(
                        {
                            name: shopjson.items[i].title.replace("<b>", "").replace("</b>", ""),
                            value:JSON.stringify(shopjson.items[i].category1).replace(/\"/gi, "")
                            +'/'+JSON.stringify(shopjson.items[i].category2).replace(/\"/gi, "") 
                            +'/'+JSON.stringify(shopjson.items[i].category3).replace(/\"/gi, "") 
                            + '\n' + JSON.stringify(shopjson.items[i].link).replace(/\"/gi, "")
                            + '\n최저가: ' + JSON.stringify(shopjson.items[i].lprice).replace(/\"/gi, "")
                        })
                i++;
            }
            return message.channel.send({ embeds: [Embed] });
        });
    }
};