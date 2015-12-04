ActorJs Remote
==============

ActorJs Remote is a module which makes actor systems communicate over TCP connections. This make the actors horizontal and vertical scalable.

Server
------
The sever can host multiple actor systems which are exposed over tcp. The api is base on the expressJs interface.

```
var actorSystem = new ActorSystem();

var server = new ActorServer();

server.use(actorSystem);

server.listen(5050, function(){
    var address = server.address();
    console.log("Start server: ", address.host + ":" + address.port);
})
```

Client
------
Client connects to the server to interact with te actor systems in the server. The client connects over tcp with the server and messages can be send to the actors

```
var client = new ActorClient(server.address(), "localhost", function(){
    var address = client.address();
    console.log("Start server: ", address.host + ":" + address.port);
    
    var actorRef = client.actorFor("actor://ActorSystem/Actor");
    actorRef.tell("Hello World!");
});
```


