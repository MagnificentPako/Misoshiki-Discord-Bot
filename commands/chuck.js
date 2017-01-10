var request = require("request");

var setup = function(bot) {
  var chuckCommand = bot.registerCommand("chuck", function(msg, args) {
    bot.sendChannelTyping(msg.channel.id);
    var req = "https://api.icndb.com/jokes/random?escape=javascript";
    if(args.length > 0) {
      req = req + "&limitTo=[";
      for(var i = 0; i < args.length; i++) {
        req = req + args[i];
        if(i+1 < args.length && args.length != 1) {req = req+","}
      }
      req = req+"]";
    }
    request(req, (err, res, body) => {
      if(!err && res.statusCode == 200) {
        var json = JSON.parse(body);
        var joke = json.value.joke;
        bot.createMessage(msg.channel.id, joke);
      }
    });
  }, {
    description: "Tells a random Chuck Norris joke",
    fullDescription: "Fetches a random Chuck Norris joke from the ICNDB (Internet Chuck Norris DataBase) and sends it to Discord"
  });

  chuckCommand.registerSubcommand("self", function(msg, args) {
    bot.sendChannelTyping(msg.channel.id);
    var req = "http://api.icndb.com/jokes/random?escape=javascript&firstName=&lastName=" + msg.channel.guild.members.get(msg.author.id).nick;
    if(args.length > 0) {
      req = req + "&limitTo=[";
      for(var i = 0; i < args.length; i++) {
        req = req + args[i];
        if(i+1 < args.length && args.length != 1) {req = req+","}
      }
      req = req+"]";
    }
    request(req, (err, res, body) => {
      if(!err && res.statusCode == 200) {
        var json = JSON.parse(body);
        var joke = json.value.joke;
        bot.createMessage(msg.channel.id, joke);
      }
    });
  }, {
    description: "Replaces the name 'Chuck Norris' with your nick",
    fullDescription: "Replaces the name 'Chuck Norris' with your nick"
  });

  chuckCommand.registerSubcommand("categories", function(msg, args) {
    bot.sendChannelTyping(msg.channel.id);
    request("http://api.icndb.com/categories", (err, res, body) => {
      if(!err && res.statusCode == 200) {
        var json = JSON.parse(body);
        var categories = json.value;
        bot.createMessage(msg.channel.id, "The available categories are: " + categories.reduce(function(a, cV, cI, array) {
          return a + (cV + (cI == array.length-1 ? "" : ", "))
        },""));
      }
    });
  }, {
    description: "displays the categories you can use for +miso chuck",
    fullDescription: "displays the categories you can use for +miso chuck"
  });
};

module.exports = {
  setup: setup
};
