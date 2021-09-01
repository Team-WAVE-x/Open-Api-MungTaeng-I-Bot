const request = require('request');
module.exports = {
  name: "고양이",
  execute(message) {
    request('https://api.thecatapi.com/v1/images/search', function (error, response, body) {
      return message.channel.send(JSON.parse(body)[0].url);
    });
  },
};