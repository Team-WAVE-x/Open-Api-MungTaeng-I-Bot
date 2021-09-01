const request = require('request');
module.exports = {
  name: "강아지",
  execute(message) {
    request('https://dog.ceo/api/breeds/image/random', function (error, response, body) {
      return message.channel.send(JSON.parse(body).message);
    });
  },  
};