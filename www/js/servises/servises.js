
app.factory('PlanetsServ', function() {

           var Service = {};
           Service.planets = {
             mercury : { name:'mercury', id: 1 },
             venus : { name:'venus', id: 2  },
             earth : { name:'earth', id: 3  },
             mars : { name:'mars', id: 4  },
             jupiter : { name:'jupiter', id: 5  },
             saturn : { name:'saturn', id: 6  },
             uranus : { name:'uranus', id: 7  },
             neptune : { name:'neptune', id: 8  }
           };

           Service.get = function () {
             return Service.planets;
           };

           Service.set = function (planets) {
             Service.planets = planets;
           };
           return Service;
});

app.factory('WebSocketServ', function($q, $rootScope) {

   var Service = {};
   var url = "ws://planetz.herokuapp.com/";
   var socket = new WebSocket(url);

   Service.get = function (id) {

    return new Promise(function(resolve, reject) {

      try {
        socket.send(id);
      } catch (e){    
        //console.log(e);
        var socket = new WebSocket(url);
        setTimeout(function () {
          socket.send(id);
        }, 500);

      }

      socket.onopen = function() {
        console.log("Socket has been opened!");
      };

      socket.onclose = function(event) {
        if (event.wasClean) {
          console.log('Connection closed');
        } else {
          console.log('Connection is failed');
        }
        console.log('Code: ' + event.code + ' Reason: ' + event.reason);
        socket = new WebSocket(url);
      };

      socket.onmessage = function(event) {
        resolve( JSON.parse(event.data) );
      };

      socket.onerror = function(error) {
        console.log("Error " + error.message);
      };

    });
  };
  return Service;
});
