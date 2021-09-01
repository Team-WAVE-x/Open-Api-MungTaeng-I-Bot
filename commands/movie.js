const { MessageEmbed } = require('discord.js');
var request = require('request');
let i = 0;
const { NaverClientId, NaverClientSecret } = require("../settings.json");

module.exports = {
    name: "영화",
    execute(message) {
        const args = message.content.split(" ");
        const Embed = new MessageEmbed().setTitle('영화 "' + `${args[1]}` + '" 의 정보입니다')
        var options = {
            'method': 'GET',
            'url': encodeURI('https://openapi.naver.com/v1/search/movie.json?query=' + `${args[1]}` + '&display=10&start=1'),
            'headers': {
                'X-Naver-Client-Id': NaverClientId,
                'X-Naver-Client-Secret': NaverClientSecret
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            const moviejson = JSON.parse(response.body);
            console.log(moviejson.items[i].actor);
            
            while (i < moviejson.total) {

                if (moviejson.items[i].actor == "") {
                    Embed.addFields(
                        {
                            name: moviejson.items[i].title.replace("<b>", "").replace("</b>", ""),
                            value: "출연 배우 정보가 없습니다"+'\n'+JSON.stringify(moviejson.items[i].link).replace(/\"/gi, "")
                        })
                } else {
                    Embed.addFields(
                        {
                            name: moviejson.items[i].title.replace("<b>", "").replace("</b>", ""),
                            value: JSON.stringify(moviejson.items[i].actor).replace(/\"/gi, "") +'\n'+JSON.stringify(moviejson.items[i].link).replace(/\"/gi, "")
                        })
                    }
                    i++;
                
            }
            return message.channel.send({ embeds: [Embed] });
        });

    }

}