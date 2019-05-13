var service = new google.maps.DistanceMatrixService();

function getTime(){
    var directions = new GDirections (); 
    var wp = new Array ();
    wp[0] = new GLatLng(32.742149,119.337218);
    wp[1] = new GLatLng(32.735347,119.328485);
    directions.loadFromWaypoints(wp);
    GEvent.addListener(directions, "load", function() {
        $('log').innerHTML = directions.getDuration ().seconds + " seconds";
         });
    document.write(directions);
} 