const Eris = require("eris");
var request = require("request");

const secret = process.env.BOT_SECRET;
const options = {};
const commandOptions = {
  description: "A Discord bot which also acts as a proxy for CC",
  name: "Misoshiki",
  owner: "laklaklak",
  prefix: ["@mention ", "+miso "]
};

var bot = new Eris.CommandClient(secret, options, commandOptions);

bot.on("ready", () => {
  console.log("Bot ready!");
  bot.editStatus("online", {name: "some weeb shit"});
});

bot.on("error", (error) => {});

//Commands
bot.registerCommand("ping", "Pong!", {
  description: "A simple ping command",
  fullDescription: "Still just a simple ping command"
});

//Some weird exports
module.exports = {
  loadCommand: function(name) {
    var cmd = require("./commands/" + name);
    cmd.setup(bot);
  },
  getLatestMessages: function(server, channel) {
    var serv = bot.guilds.filter(function(guild) {
      return guild.name === server;
    })[0];
    var chan = serv.channels.filter(function(chann) {
      return chann.name === channel;
    })[0];
    var messages = chan.getMessages(10);
    return messages;
  },
  getMembers: function(server) {
    return bot.guilds.filter(function(guild) {
      return guild.name === server
    })[0].members.map(function(member) {
      return member.user.username;
    });
  },
  getChannels: function(server) {
    return bot.guilds.filter(function(guild) {
      return guild.name === server
    }).map(function(guild) {
        return guild.channels
        .filter(function(channel) {return channel.type === 0})
        .filter(function(channel) {return channel.permissionsOf(bot.user.id).has("sendMessages")})
        .map(function(channel) {return channel.name});
    })[0];
  },
  getServerNames: function() {
    return bot.guilds.map(function(guild) { return guild.name; });
  },
  sendToChannel: function(serv, ch, message) {
    bot.guilds.forEach(function(guild) {
      if(guild.name === serv) {
        guild.channels.forEach(function(channel) {
          if(channel.name === ch) {
            channel.createMessage(message);
          }
        });
      }
    });
  },
  connect: function() {
    bot.connect();
  }
};
