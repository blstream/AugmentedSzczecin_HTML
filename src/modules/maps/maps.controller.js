AugmentedSzczecin.controller('MapController',['$scope', 'apiService', function($scope,apiService){
    $scope.pois = [];
    var markers = [];

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

                    marker = placeMarker(coordinates);
                        points.push(marker);
                });
            /**
            * Clustering - creates one Poi from group of Pois
            * @type {google}
            */            
            var markerCluster = new MarkerClusterer(map, points);

            for (var point = 0; point < points.length; point++) {
                points[point]
            };

        })
        .error(function(data, status, headers, config){
            $scope.$emit('apiError', data, status, headers, config);
        });
    apiService.retrievePlace(0)
        .success(function(data,status, headers, config) {
          $scope.singlePoi = data;
            var name= $scope.singlePoi['name']
            })
          .error(function(data, status, headers, config){
            $scope.$emit('apiError', data);
          });

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var handler = document.getElementById('map-canvas');
    var mainPosition = new google.maps.LatLng(53.4252,14.5504);

    /** Map initialization    */
    function initialize(mapHandler) {
        directionsDisplay = new google.maps.DirectionsRenderer();       
        /** Map options */
        var mapOptions = {
            streetViewControl: false,
            mapTypeControl: true,
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            panControl: false,
            zoom:16,
            center:mainPosition,
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
		directionsDisplay.setOptions( { suppressMarkers: true });
        /**
         * Right mouse button click sets a Marker on Map
         * @param  {[object} event) {placeMarker(event.latLng);}  - ppm sets Marker
         * @return {[type]}        - set Marker in selected place
         */
        google.maps.event.addListener(map, 'click', function(event) {
            var answer = window.confirm("Czy na pewno chcesz umieścić pinezkę tutaj?");
            if (answer) {
                placeMarker(event.latLng);
                $scope.coordinates = event.latLng;
                console.log($scope.coordinates);
                if (document.getElementById("lsmenu").style.display = "none"){
                    document.getElementById("lsmenu").style.display = "block"
                }
                if (document.getElementById("rsmenu").style.display = "block"){
                    document.getElementById("rsmenu").style.display = "none"
                }
            }

        });
    }

    /**
     * switch view to AR
     * get current position of map and set it as position of streetview
     *
     */
    var panorama;
    switchAR = function () {
        panorama= map.getStreetView();
        panorama.setPosition(map.getCenter());
        panorama.setPov(({
            heading: 265,
            pitch: 0
        }));
        panorama.setVisible(true);
    }
    /**
     * switch view to map 2D
     */
    switchMap = function () {
        panorama.setVisible(false);
    }

    /**
     * Marker
     * @param  {object} location 
     * @return {google}          - display Marker in selected place
     */    
    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
             icon: 'statics/images/public.png'
        });
         var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
         var home = new google.maps.Marker({
		  position: mainPosition,
		  map: map,
		  icon: iconBase + 'schools_maps.png'
		});        

		google.maps.event.addListener(marker, 'click', function() {
            $scope.endRoute = marker.getPosition();
        });

        google.maps.event.addDomListener(marker, 'click', function() { 
        	if (document.getElementById("rsmenu").style.display = "none"){
        	  document.getElementById("rsmenu").style.display = "block"
        	}
		});

        return marker;
    }
    google.maps.event.addDomListener(window, 'load', initialize(handler));


$scope.start_route = new google.maps.LatLng(53.4252,14.5504);

    /**
     * Path finding
     * @param  {object} origin      - start point of path
     * @param  {object} destination - end point of path
     * @return {google}             - shows the shortest path
     */
    $scope.calcRoute = function (origin, destination) {
        var request = {
           origin: origin,
            destination: destination,
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
