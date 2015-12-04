var net = require("net");

var objectstream = require('objectstream');

var actorjs = require("../");

var ActorServer = actorjs.ActorServer;

exports['Create Anonymous Node'] = function (test) {
    var server = new ActorServer();

    test.ok(server);

    test.done();
};

exports['Use ActorSystem in ActorServer'] = function (test) {

    var server = new ActorServer();
    server.use(new MockSystem())

    test.ok(server);
    test.ok(server.systems);
    test.equals("TestSystem", server.systems["testsystem"].name);

    test.done();
};

exports['Start listener'] = function (test) {

    var server = new ActorServer();
    server.use(new MockSystem())

    server.listen(function () {
        var address = server.address();
        test.ok(address);
        server.close(function () {
            test.done();
        });
    })
};


exports['Send message'] = function (test) {

    var receive = function(message){
        test.ok(message)
        test.equals("World!", message.hello);
        server.close(function () {
            test.done();
        });
    };

    var server = new ActorServer();
    server.use(new MockSystem(receive))

    server.listen(function () {
        var address = server.address();
        var client = net.connect(address, function () {
            console.log('connected to server!');

            var stream = objectstream.createStream(client);
            stream.write({
                path: "actor://TestSystem/TestActor",
                message: {
                    hello: "World!"
                }
            });

            stream.end();
            client.end();

        });
    });
};

var MockSystem = function (receive) {
    this.name = "TestSystem";

    this.actorFor = function(){
        return new MockActorRef(receive);
    }
};

var MockActorRef = function (receive) {
    this.tell = function(msg){
        receive(msg)
    }
};