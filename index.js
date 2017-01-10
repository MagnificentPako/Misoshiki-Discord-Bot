require("dotenv").config();
const Bot = require("./bot");
const Web = require("./web");

Bot.connect();
Web.connect(Bot);

Bot.loadCommand("chuck");
Bot.loadCommand("yomomma");

Web.loadRoute("members");
Web.loadRoute("servers");
Web.loadRoute("channels");
Web.loadRoute("sendMessage");
Web.loadRoute("getMessages");
