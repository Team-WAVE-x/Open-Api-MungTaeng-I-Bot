const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    execute(message) {
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("**Help**")
            .addField(':help', '명령어 목록 및 도움말을 보여줍니다')
            .addField(':맛집 (시/군명)', '"경기도"에 있는 맛집들을 보여줍니다')
            .addField(':고양이', '고양이 사진을 랜덤하게 보여줍니다')
            .addField(':강아지', '강아지 사진을 랜덤하게 보여줍니다')
            .setTimestamp()
            .setFooter('Mungtengyee');

        message.channel.send({ embeds: [exampleEmbed] });
    }
};