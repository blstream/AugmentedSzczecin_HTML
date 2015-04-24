AugmentedSzczecin.controller('MapController',['$scope', 'apiService', function($scope,apiService ){
    $scope.pois = [];

    /** get all available pois from server and keep in context */
    apiService.getPois()
        .success(function(data, status, headers, config){
            // we need remember, 'pois' can be accessible after a while
            // outside the function
            $scope.pois = data;
        })
        .error(function(data, status, headers, config){
            //@TODO: here will appear Error Handling someday...
        });

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var handler = document.getElementById('map-canvas');
    var initialize;

    /** Map initialization    */
    function initialize(mapHandler) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var center = new google.maps.LatLng(53.425175, 14.550454);

        /** Map options */
        var mapOptions = {
            streetViewControl: true,
            mapTypeControl: true,
            panControl: false,
            zoom:16,
            center: center,
            scaleControl: true,
            /** cleaning map of default POIs */
            styles: [{
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }]
        };
        map = new google.maps.Map(mapHandler, mapOptions);
        directionsDisplay.setMap(map);

        /**
         * Right mouse button click sets a Marker on Map
         * @param  {[object} event) {placeMarker(event.latLng);}  - ppm sets Marker
         * @return {[type]}        - set Marker in selected place
         */
        google.maps.event.addListener(map, 'rightclick', function(event) {
            placeMarker(event.latLng);
        });

        var points = [];

        points.forEach(function(entry){
            var coordinates = new google.maps.LatLng(
                entry[1], entry[2]
            );

            poiMarker= new google.maps.Marker({
                position: coordinates,
                map: map
            });
            points.push(poiMarker);
        });
        /**
         * Clustering - creates one Poi from group of Pois
         * @type {google}
         */
       var markerCluster = new MarkerClusterer(map, points);
    }
    google.maps.event.addDomListener(window, 'load', initialize(handler));

    /**
     * Marker
     * @param  {object} location 
     * @return {google}          - display Marker in selected place
     */
    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        /**
         * Marker info window
         * @type {google}
         */
        var infowindow = new google.maps.InfoWindow({
            content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
        });
        infowindow.open(map,marker);
    }

    /**
     * Path finding
     * @param  {object} origin      - start point of path
     * @param  {object} destination - end point of path
     * @return {google}             - shows the shortest path
     */
    $scope.calcRoute = function (origin, destination) {
        var request = {
            origin: new google.maps.LatLng(origin.location.latitude, origin.location.longitude),
            destination: new google.maps.LatLng(destination.location.latitude, destination.location.longitude),
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    };

    $scope.getValue = function(id){
        return document.getElementById(id).value;
    };
}]);
