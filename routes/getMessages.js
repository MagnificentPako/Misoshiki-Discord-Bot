module.exports = {
  mode: "get",
  route: "/receive/:server/:channel/",
  router: function(Bot) {
    return function(req, res) {
      var serv = req.params.server;
      var chan = req.params.channel;
      var messages = Bot.getLatestMessages(serv, chan);
      messages.then(function(val) {
        var done = val.map(function(message) {
         return {
           id: message.id,
           author: message.author.username,
           timestamp: message.timestamp,
           content: message.cleanContent
         }
       });
       res.send(JSON.stringify(done));
      });
    }
  }
}
