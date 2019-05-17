
      var autocomplete;
      function initAutocomplete() {
        // Create the autocomplete object, restricting the search predictions to
        // geographical location types.
        autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), {types: ['geocode']});

        // Avoid paying for data that you don't need by restricting the set of
        // place fields that are returned to just the address components..
        autocomplete.setFields(['address_component']);

        // When the user selects an address from the drop-down, populate the
        // address fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
      }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle(
                {center: geolocation, radius: position.coords.accuracy});
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }

    function addLocate() {
        var address = document.getElementById('autocomplete').value;

        $.ajax({
            url: 'https://kflorendo.github.io/bus-app/add-route.php', // to the server
            type: 'POST',
            data: {'address': address},
            success: function(data) {
                alert(data);
            },
            error: function(request, error) {
                console.log("Error", error)
            }
        })

      }

$('form.ajax-form').on('submit', function() {
  var that = $(this),
      url = that.attr('action'),
      type = that.attr('method'),
      data = {};
  that.find('[name]').each(function(index, value) {
    var that = $(this),
        name = that.attr('name'),
        value = that.val();
    data[name] = value;
  });
  console.log(data);

  $.ajax({
    url: url,
    type: type,
    data: data,
    success: function(response) {
      console.log(response);
      alert("worked!");
    }
  });
  return false;
})
