AugmentedSzczecin.controller('MapController',['$scope', function($scope){
    //MAP
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var handler = document.getElementById('map-canvas');

    function initialize(mapHandler) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var center = new google.maps.LatLng(53.425175, 14.550454);
        var mapOptions = {
            streetViewControl: false,
            mapTypeControl: false,
            panControl: false,
            zoom:15,
            center: center,
            scaleControl: true
        };
        map = new google.maps.Map(mapHandler, mapOptions);
        directionsDisplay.setMap(map);

        google.maps.event.addListener(map, 'rightclick', function(event) {
            placeMarker(event.latLng);
        });

        //ARRAY of MARKERS
        var poiList= [];
        var points= [
            ['katedra', 53.424736, 14.556168],
            ['kaskada', 53.428271, 14.551955],
            ['castorama', 53.386734, 14.659007],
            ['komisariat dąbie', 53.394111, 14.671734],
            ['outlet park', 53.381792, 14.669432],
            ['wneiz', 53.438839, 14.520724],
            ['wi zut', 53.448778, 14.491090],
            ['kordecki', 53.423487, 14.531787],
            ['szpital na unii', 53.448693, 14.504945],
            ['deptak', 53.429926, 14.544256]
        ]

        points.forEach(function(entry){
            var coordinates= new google.maps.LatLng(
                entry[1], entry[2]
            );
            poiMarker= new google.maps.Marker({
                position: coordinates,
                map: map
            });
            poiList.push(poiMarker);
        });
        //MarkerClusterer
        var markerCluster = new MarkerClusterer(map, poiList);
    }
    google.maps.event.addDomListener(window, 'load', initialize(handler));

    //Functions
    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        var infowindow = new google.maps.InfoWindow({
            content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
        });
        infowindow.open(map,marker);
    }

    $scope.chooseRoute = function(route){

        var bramaPortowa = new google.maps.LatLng(53.425060, 14.550462);
        var zamek = new google.maps.LatLng(53.426220, 14.560521);
        var walyChrobrego = new google.maps.LatLng(53.428528, 14.563938);
        var jasneBlonia = new google.maps.LatLng(53.440721, 14.540001);

        switch (route) {
            case 0:
                calcRoute(bramaPortowa,zamek);
                break;
            case 1:
                calcRoute(walyChrobrego,jasneBlonia)
                break;
        }
    }

    function calcRoute (startLatLng, endLatLng) {

        var request = {
            origin:startLatLng,
            destination:endLatLng,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }
}]);
