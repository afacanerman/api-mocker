var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var ApiMocker = (function() {
    'use strict';

    function apiMocker() {

        var routeDefinitions = [{
            route: "/",
            statusCode: 200,
            body: {
                'data': 'success'
            }
        }];


        function createServer() {

            http.createServer(function(request, response) {

                var uri = url.parse(request.url).pathname;
                console.log(uri)
                var definition;

                for (var i = 0; i < routeDefinitions.length; i++) {

                    if (uri === routeDefinitions[i].route) {
                        definition = routeDefinitions[i];
                        if (definition.statusCode !== 200) {
                            eval("throw" + definition.statusCode + "()");
                            return;
                        }
                    }
                };

                if (!definition) {
                    throw503();
                    return;
                }

                response.setHeader('content-type', 'application/json');
                response.writeHead(200);
                response.write(JSON.stringify(definition.body));
                response.end();



                function throw301() {
                    response.writeHead(503, {
                        "Content-Type": "text/plain"
                    });
                    response.write("301 Moved Permanently\n");
                    response.end();
                    return;
                }

                function throw400() {
                    response.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    response.write("400 Bad Request\n");
                    response.end();
                    return;
                }

                function throw403() {
                    response.writeHead(403, {
                        "Content-Type": "text/plain"
                    });
                    response.write("403 Forbidden\n");
                    response.end();
                    return;
                }

                function throw404() {
                    response.writeHead(404, {
                        "Content-Type": "text/plain"
                    });
                    response.write("404 Not Found\n");
                    response.end();
                    return;
                }

                function throw408() {
                    response.writeHead(408, {
                        "Content-Type": "text/plain"
                    });
                    response.write("408 Request Timeout\n");
                    response.end();
                    return;
                }

                function throw500() {
                    response.writeHead(500, {
                        "Content-Type": "text/plain"
                    });
                    response.write("500 Not Found\n");
                    response.end();
                    return;
                }

                function throw503() {
                    response.writeHead(503, {
                        "Content-Type": "text/plain"
                    });
                    response.write("503 Service Unavailable\n");
                    response.end();
                    return;
                }

                function throw504() {
                    response.writeHead(504, {
                        "Content-Type": "text/plain"
                    });
                    response.write("504 Gateway Timeout\n");
                    response.end();
                    return;
                }

            }).listen(8080);
            console.log("Server running at http://localhost:8080/");
        }

        

        return {
            init: function(serviceMockList) {
                for (var i = 0; i < serviceMockList.length; i++) {
                    routeDefinitions.push(serviceMockList[i]);
                };
                
                createServer();
            }
        }
    }

    return apiMocker;
})();

module.exports = ApiMocker;