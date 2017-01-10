var request = require("request");

var setup = function(bot) {
  bot.registerCommand("yomomma", function(msg, args) {
    bot.sendChannelTyping(msg.channel.id);
    request("http://api.yomomma.info/", (err, res, body) => {
      if(!err && res.statusCode == 200) {
        var json = JSON.parse(body);
        var joke = json.joke;
        bot.createMessage(msg.channel.id, joke);
      }
    });
  }, {
    description: "Sends a random 'Yo Momma' joke",
    fullDescription: "Source: http://yomomma.info/"
  });
};

module.exports = {
  setup: setup
}
