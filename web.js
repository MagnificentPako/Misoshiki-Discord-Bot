var express = require("express");
var app = express();

var bot;

module.exports = {
  app: app,
  connect: function(bo) {
    app.listen(3000, function() {
      console.log("Web server ready!");
    });
    bot = bo;
  },
  loadRoute: function(name) {
    var route = require("./routes/" + name);
    app.get(route.route, route.router(bot));
  }
}
