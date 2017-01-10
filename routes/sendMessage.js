module.exports = {
  route: "/send/:server/:channel/:message",
  router: function(Bot) {
    return function(req, res) {
      Bot.sendToChannel(req.params.server, req.params.channel, req.params.message);
      res.send("Sent '" + req.params.message + "' to discord!");
    }
  }
};
