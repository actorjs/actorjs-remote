var net = require('net');
var url = require('url');

var objectstream = require('objectstream');

var ActorServer = function () {

    var self = this;

    this.systems = {};

    this.server = net.createServer(function (socket) {


        var stream = objectstream.createStream(socket);

        stream.on('data', function (envelop) {
            var path = envelop.path;
            var object = url.parse(path);
            var actorSystem = self.systems[object.hostname];
            var actorRef = actorSystem.actorFor(path);
            actorRef.tell(envelop.message)
        });

        stream.on('error', function (err) {
            console.log(err);
        });

    });

};

ActorServer.prototype.use = function (system) {
    this.systems[system.name.toLowerCase()] = system;
};

ActorServer.prototype.listen = function () {
    return this.server.listen.apply(this.server, arguments);
};

ActorServer.prototype.address = function () {
    return this.server.address.apply(this.server, arguments);
};


ActorServer.prototype.close = function () {
    return this.server.close.apply(this.server, arguments);
};


module.exports = ActorServer;