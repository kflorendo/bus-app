function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: {lat: 41.85, lng: -87.65}
    });
    
    document.getElementById('submit').addEventListener('click', function() {
      directionsDisplay.setMap(map);
      calculateAndDisplayRoute(directionsService, directionsDisplay, [{ location: "509 Presidents Way", stopover: true}]);
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, waypts) {
    //var waypts = [{ location: "509 Presidents Way", stopover: true}];
    
    //call route on directions service object
    directionsService.route({                                         //pass in DirectionsRequest object literal
      origin: "162 Serpentine Drive",                                        //start location
      destination: "765 Newman Springs Rd, Lincroft, NJ 07738",       //end location
      waypoints: waypts,                                              //array of DirectionsWaypoints, each waypoint is an object literal with location and stopover(bool)
      optimizeWaypoints: true,                                        //returning optimized route specified in waypoint_order field
      travelMode: 'DRIVING'
    }, function(response, status) { //callback function
      if (status === 'OK') {
        
        //document.getElementById("json-text").innerHTML = JSON.stringify(response);
        
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
              '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br>';
          summaryPanel.innerHTML += route.legs[i].duration.text + '<br><br>';
        }
        
        // for each address, populate mysql "addresses" table
        var mysql = require('mysql');
    
        var con = mysql.createConnection({
          host: "localhost",
          user: "busapp",
          password: "sql123",
          database: "busRouteDB"
        });
        
        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = "INSERT INTO addresses (address, route_num, route_order, stop_time, student_id) VALUES ('"
          sql += waypts[0].location;
          sql +="', '1', '1', '6:00', '1')";
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        });
        
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}