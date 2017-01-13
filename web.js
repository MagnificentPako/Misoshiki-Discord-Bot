var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var bot;

var port  = process.env.PORT  || process.env.OPENSHIFT_NODEJS_PORT  || 8080,
    ip    = process.env.IP    || process.env.OPENSHIFT_NODEJS_IP    || "0.0.0.0"

app.use(bodyParser.json());

module.exports = {
  app: app,
  connect: function(bo) {
    app.listen(port, ip);
    console.log("Web server ready! Listening on " + ip + ":" + port);
    bot = bo;
  },
  loadRoute: function(name) {
    var route = require("./routes/" + name);
    if(route.mode === "get") {
      app.get(route.route, route.router(bot));
    }else if(route.mode === "post") {
      app.post(route.route, route.router(bot));
    }
  }
}
