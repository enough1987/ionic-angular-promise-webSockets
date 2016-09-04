

app.controller("starterCtrl", function ( PlanetsServ, WebSocketServ ) {

  this.planets = PlanetsServ.get();

  this.get_planet_info = function(){
      if ( !this.selected_planet_id ) {
        this.no_planet_id = true;
        return;
      }
      delete this.no_planet_id;

      WebSocketServ.get(this.selected_planet_id).then(function(data){
        if ( data.error ) {
          console.log(data.error);
          return;
        }
        document.querySelector('#memo').value = data.description;
      });
  };


});
