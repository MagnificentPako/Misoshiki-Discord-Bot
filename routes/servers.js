module.exports = {
  mode: "get",
  route: "/servers",
  router: function(Bot) {
    return function(req, res) {
      var servers = Bot.getServerNames();
      res.send(JSON.stringify(servers));
    }
  }
};
