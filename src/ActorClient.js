var net = require('net');

var ActorRef = require("./ActorRef");

var ActorClient = function () {
    this.client = net.connect.apply(net.connect, arguments);
};

ActorClient.prototype.actorFor = function(path){
    return new ActorRef(this.client, path);
};

ActorClient.prototype.address = function () {
    return this.client.address.apply(this.client, arguments);
};

module.exports = ActorClient;