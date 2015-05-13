AugmentedSzczecin.controller('MapController',['$scope', 'apiService', function($scope,apiService){
    $scope.pois = [];

    /** get all available pois from server and keep in context */
    apiService.getPlaces()
        .success(function(data, status, headers, config){
            // we need remember, 'pois' can be accessible after a while
            // outside the function
            $scope.pois = data;

            var points = [];
                $scope.pois.forEach(function(entery) {
                    var coordinates = new google.maps.LatLng(entery['location']['latitude'],
                        entery['location']['longitude']
                    );

                    placeMarker(coordinates);
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

        })
        .error(function(data, status, headers, config){
            $scope.$emit('apiError', data);
        });

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var handler = document.getElementById('map-canvas');


    /** Map initialization    */
    function initialize(mapHandler) {
        directionsDisplay = new google.maps.DirectionsRenderer();

        /** Map options */
        var mapOptions = {
            streetViewControl: true,
            mapTypeControl: true,
            panControl: false,
            zoom:16,
            center:new google.maps.LatLng(53.4252,14.5504),
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
    }

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

        google.maps.event.addListener(marker, 'leftclick', function() {
          apiService.retrievePlace(0)
        	.success(function(data,status, headers, config) {
          $scope.singlePoi = data;
            var name= $scope.singlePoi['name']
            console.log(name);
       	 	})
          .error(function(data, status, headers, config){
            $scope.$emit('apiError', data);
          });
        });
        /**
         * Right mouse button click sets a Marker on Map
         * @param  {[object} event) {placeMarker(event.latLng);}  - ppm sets Marker
         * @return {[type]}        - set Marker in selected place
         */
        google.maps.event.addListener(map, 'rightclick', function(event) {        
          placeMarker(event.latLng);    
            var alert = window.confirm("Czy na pewno chcesz umieścić pinezkę tutaj?")
          if (alert)
            showMenu();
          else
            marker.setMap(null);
        });   

        function showMenu() {
        	if (document.getElementById("lsmenu").style.display = "none"){
        	       document.getElementById("lsmenu").style.display = "block"
        	}
		} 
    }
    google.maps.event.addDomListener(window, 'load', initialize(handler));

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
