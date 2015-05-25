#!/usr/bin/env node

var program = require('commander');
var ApiMocker = require("./lib/api-mocker.js");
var sys = require("sys"),
  http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs");

program
  .version('0.0.1')
  .option('-p, --filepath [value]', 'contracts path')
  .parse(process.argv);

if (program.filepath === undefined) { throw "filepath argument is mandatory for help -h";  }

var apiMocker = new ApiMocker();
apiMocker.init();
console.log('api-mocker started for the metada files under \'%s\'\n\n', program.filepath);

