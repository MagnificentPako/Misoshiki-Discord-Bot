module.exports = {
  route: "/server/:server/members",
  router: function(Bot) {
      return function(req, res) {
      var members = Bot.getMembers(req.params.server);
      res.send(JSON.stringify(members));
    }
  }
};
