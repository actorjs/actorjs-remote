var objectstream = require('objectstream');

var ActorRef = function (client, path) {

    var stream = objectstream.createStream(client);

    this.tell = function (message) {
        stream.write({
            path: path,
            message: message
        });
    }

}

module.exports = ActorRef;