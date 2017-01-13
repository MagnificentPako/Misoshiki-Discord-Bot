module.exports = {
  mode: "get",
  route: "/server/:server/channels",
  router: function(Bot) {
    return function(req, res) {
      var channels = Bot.getChannels(req.params.server);
      res.send(JSON.stringify(channels));
    }
  }
};
