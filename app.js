#!/usr/bin/env node

var program = require('commander');
var ApiMocker = require("./lib/api-mocker.js");
var sys = require("sys"),
  http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  q = require("q");

program
  .version('0.0.1')
  .option('-p, --filepath [value]', 'contracts path')
  .parse(process.argv);


if (program.filepath === undefined) { throw "filepath argument is mandatory for help -h";  }

var splitedFilePaths = program.filepath.split(',');

var contractList = [];

function getContracts(){
    var pathIndex = 0;
    var index =0;
    var files = [];
    console.log(splitedFilePaths);
    // loop on directories
    getContract(splitedFilePaths[pathIndex], index, pathIndex, files);
   
    var apiMocker = new ApiMocker();
    apiMocker.init(contractList);
    console.log('api-mocker started for the metada files under \'%s\'\n\n', program.filepath);
}

function getContract(fp, index, pathIndex, files){
/*
      console.log("pathIndex:"+pathIndex);
      console.log("index:"+index);
      console.log("contract: "+fp);*/

      if(splitedFilePaths.length > pathIndex && fp != undefined) {

            if(index == 0 && files.length == 0){
              files = fs.readdirSync(splitedFilePaths[pathIndex]);
            }

            //console.log("files.length: " + files.length);
            if(files.length > index) {
                // loop on files
                /*console.log("" + splitedFilePaths[pathIndex] + files[index]);
                console.log("has contract : " + files[index].indexOf('.contract') > -1);
                console.log(files[index]);*/

                if (files[index].indexOf('.contract') > -1) {
                    //console.log("reading : "+ splitedFilePaths[pathIndex] + files[index])
                    var serviceStub = JSON.parse(fs.readFileSync(splitedFilePaths[pathIndex] + files[index], 'utf8'));
                      
                    contractList.push({
                        route: serviceStub.uri,
                        statusCode: serviceStub.expect.request.status_code,
                        body: serviceStub.expect.body
                    });
                }
                index++;
                //console.log("next file: "+files[index]);
                getContract(files[index], index, pathIndex, files);
              }
        }
       else if(splitedFilePaths.length > pathIndex){
            
            index = 0;
            pathIndex++;
            files = [];
            getContract(splitedFilePaths[pathIndex], index, pathIndex, files);
        }
}


getContracts();




