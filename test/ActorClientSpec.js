var net = require("net");

var actorjs = require("../");

var ActorClient = actorjs.ActorClient;

exports['Create Actor Client'] = function (test) {
    var server = net.createServer(function(socket){

    });
    server.listen(function(){
        console.log("Start server: ", server.address());
        var client = new ActorClient(server.address(), "localhost", function(){
            console.log("Start client: ", client.address());
            server.close();
            test.done();
        });

    });
};