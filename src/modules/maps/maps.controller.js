AugmentedSzczecin.controller('MapController',['$scope', 'apiService', function($scope,apiService ){

   /* $http.get('http://private-anon-1813a5f7c-patronage2015.apiary-mock.com/pois').
        success(function(data, status, headers, config){
            $scope.jsonList= data;
        }).
        error(function(data,status, headers, config){

        }); */
   $scope.pois =  apiService.pois;

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var handler = document.getElementById('map-canvas');
    /**
     * Inicjalizacja mapy, centrowanie jej, oraz wyswietlanie tras
     *
     */
    function initialize(mapHandler) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var center = new google.maps.LatLng(53.425175, 14.550454);
        /**
         * Opcje mapy
         * @type {Object}
         */

        var mapOptions = {
            streetViewControl: true,
            mapTypeControl: true,
            panControl: false,
            zoom:16,
            center: center,
            scaleControl: true,
            //cleaning map of default POIs
            styles: [{
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }]
        };
        /**
         * Wysiwietlanie mapy wraz z jej opcjami
         * @type {google}
         */
        map = new google.maps.Map(mapHandler, mapOptions);
        directionsDisplay.setMap(map);

        /**
         * Funkcja stawiajaca Pinezke na mapie
         * @param  {[object} event) {placeMarker(event.latLng);}  - ppm stawia na mapie Pinezke
         * @return {[type]}        - Pinezka pojawia sie w wyznaczonym przez nas miejscu
         */
        google.maps.event.addListener(map, 'rightclick', function(event) {
            placeMarker(event.latLng);
        });

        /**
         * @todo poiList - tablica z punktami poi
         * @type {Array}
         */
        var poiList= [];
        /**
         * punkty poi wyznaczone, do czasu uzyskania poiList
         * @type {Array}
         */
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
       /**
        * Klastrowanie, zbieranie wiekszej ilosci punktow poi w jeden
        * @param  {google} entry){var coordinates  - cordy punktow poi
        */
        points.forEach(function(entry){
            var coordinates = new google.maps.LatLng(
                entry[1], entry[2]
            );
            poiMarker= new google.maps.Marker({
                position: coordinates,
                map: map
            });
            poiList.push(poiMarker);
        });
        /**
         * Tworzenie Punktu klastwoania, z wyswietlanie ilosci punktow poi w nim
         * @type {MarkerClusterer}
         */
       var markerCluster = new MarkerClusterer(map, poiList);
    }
    google.maps.event.addDomListener(window, 'load', initialize(handler));

    /**
     * Pinezka
     * @param  {object} location - okreslenie lokacji w ktorej postawiona bedzie pinezka
     * @return {google}          - wyswietlenie pinezkina mapie
     */
    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        /**
         * Okienko informacyjne z coordami
         * @type {google}
         */
        var infowindow = new google.maps.InfoWindow({
            content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
        });
        infowindow.open(map,marker);
    }

    $scope.monuments = [
        {
        'name': 'Brama Portowa',
        'lat': 53.425060,
        'lng': 14.550462
        },
        {
        'name': 'Zamek Książąt Pomorskich',
        'lat': 53.426220,
        'lng': 14.560521
        },
        {
        'name': 'Wały Chrobrego',
        'lat': 53.428528,
        'lng': 14.563938
        },
        {
        'name': 'Jasne Błonia',
        'lat': 53.440721,
        'lng': 14.540001
        }
    ];
    /**
     * Wyznaczanie trasy
     * @param  {object} origin      - punkt poczatkowy naszej trasy
     * @param  {object} destination - punkt koncowy naszej trasy
     * @return {google}             - wyznacza najkrotsza trase pomiedzy punktami
     */
    $scope.calcRoute = function (origin, destination) {
        var request = {
            origin: new google.maps.LatLng(origin.lat, origin.lng),
            destination: new google.maps.LatLng(destination.lat, destination.lng),
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
