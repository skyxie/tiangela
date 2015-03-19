
'use strict';

var path = require("path");
var winston = require("winston");
var express = require("express");
var helpers = require("express-helpers");
var expressWinston = require("express-winston");

var port = process.env.PORT || 8000;
var transports = [new winston.transports.Console({
                    level: (process.env.LOG_LEVEL || "info"),
                    dumpExceptions : true,
                    showStack : true,
                    colorize : true
                  })];

var logger =  new winston.Logger({"transports" : transports});

var app = express();

helpers(app);
app.use(express.static("public"));
app.use(expressWinston.logger({"transports" : transports}));
app.use(expressWinston.errorLogger({"transports" : transports}));

app.get('/', function index(req, res) {
  res.render("index.html.ejs");
});

app.listen(port, function() {
  logger.info("Server listening on port %d", port);
});
