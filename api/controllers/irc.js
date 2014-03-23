'use strict';

module.exports = function ($youmeb) {


  var irc = require("irc");

  var config = {
    channels: ["#fumao.word.live"],
    server: "irc.freenode.net",
    botName: "ircirc"
  };

  var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
  });


  this.$({
    name: 'irc',
    path: ''
  });

  bot.addListener("message", function(from, to, text, msg) {
    // Welcome them in!
    console.log(text)
    // bot.say(channel, who + "...dude...welcome back!");
  });
  this.index = {
    path: '/',
    methods: ['all'],
    handler: function (req, res, next) {
      res.send('irc');
    }
  };



};
