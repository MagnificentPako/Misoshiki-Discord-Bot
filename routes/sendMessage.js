module.exports = {
  mode: "post",
  route: "/send/:server/:channel/",
  router: function(Bot) {
    return function(req, res) {
      var msg = req.body;
      Bot.sendToChannel(req.params.server, req.params.channel, msg.user + ": " + msg.content);
    }
  }
};
