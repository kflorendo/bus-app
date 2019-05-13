var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = 'Greenwich, England';
var destinationA = 'Stockholm, Sweden';
var destinationB = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: 'DRIVING',
    transitOptions: TransitOptions,
    drivingOptions: DrivingOptions,
    unitSystem: UnitSystem,
    avoidHighways: Boolean,
    avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
  // See Parsing the Results for
  // the basics of a callback function.
}

function on() { // display the add item overlay
  document.getElementById("overlay").style.display = "block";
}

function off() { // hide the add item overlay
  document.getElementById("overlay").style.display = "none";
}

function addClothing() { // add a clothing item
    var fileInput = document.getElementById('add-image'); // get image item
    var file = fileInput.files[0]; // get our file
    
    var formData = new FormData() // create a form data so we can transfer images
    formData.append('clothing', $('#add-clothing').val())
    formData.append('style', $('#add-style').val())
    formData.append('color', $('#add-color').val())
    formData.append('brand', $('#add-brand').val())
    formData.append('size', $('#add-size').val())
    formData.append('action', 'add')
    formData.append('image', file)
    
    $.ajax({
        url: 'search_process.php', // to the server
        type: 'POST',
        data: formData,
        processData: false, // we don't want Jquery to modify our raw image data
        contentType: false,
        success: function(data) {
            alert("Added")
            off(); // close the add item popup
            searchData(); // and refresh the table
        },
        error: function(request, error) {
            console.log("Error", error)
        }
    })
}
