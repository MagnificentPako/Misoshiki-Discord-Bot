  var express = require("express");
var app = express();

var bot;

var port  = process.env.PORT  || process.env.OPENSHIFT_NODEJS_PORT  || 8080,
    ip    = process.env.IP    || process.env.OPENSHIFT_NODEJS_IP    || "0.0.0.0"

module.exports = {
  app: app,
  connect: function(bo) {
    app.listen(port, ip);
    console.log("Web server ready! Listening on " + ip + ":" + port);
    bot = bo;
  },
  loadRoute: function(name) {
    var route = require("./routes/" + name);
    app.get(route.route, route.router(bot));
  }
}
