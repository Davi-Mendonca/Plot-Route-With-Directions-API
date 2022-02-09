var directionsService;
var directionsRenderer;
var autocomplete;
var options;
var inputs;
var detail;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  options = {
    componentRestrictions: { country: "br" },
    fields: ["address_components"/*, "geometry", "icon", "name"*/],
    strictBounds: false,
    types: ["address"]
  };

  inputs = [];
  inputs[0] = document.getElementById('partida');
  inputs[1] = document.getElementById('destino');
  autocomplete = new google.maps.places.Autocomplete(inputs[0], options);
  autocomplete = new google.maps.places.Autocomplete(inputs[1], options);
  autocomplete.setOptions({ strictBounds: false });
  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    console.log(place.formatted_address)
  })
  var pos;

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: -17.76243490598546, lng: -60.803062007263634 }
  });

  directionsRenderer.setMap(map);

}

$('#tracarRota').on("click", function getEnderecos() {

  start = $('#partida').val();
  end = $('#destino').val();

  console.log('De ' + start + ' até ' + end);

  directionsService.route({
    origin: start,
    destination: end,
    waypoints: [
      //{location: 'Rio de janeiro, Brasil', stopover: false} //One leg.
      //{location: 'Rio de janeiro, Brasil', stopover: true}
    ],
    travelMode: google.maps.TravelMode.DRIVING,
  }).then(response => {
    console.log({ response });
    directionsRenderer.setDirections(response);

    detail = response;
    //map.fitBounds( response.routes[0].bounds );
    //renderPolyline(response.routes[0].overview_path, map);

  }).catch(err => {
    console.log({ err });
  })
});
