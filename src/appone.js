var AppOne = angular.module('AppOne',['ui.router']);

AppOne.controller('FirstController',['$scope','$log', function($scope,$log){
    //MAP
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var center = new google.maps.LatLng(53.428867,14.556497);
        var mapOptions = {
            zoom:10,
            center: center,
            scale: true
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);

        google.maps.event.addListener(map, 'rightclick', function(event) {
            placeMarker(event.latLng);
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);

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

AppOne.config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/maps");
    $stateProvider.state('maps',{
        url: "/maps",
        templateUrl: "src/maps.html",
        controller: "FirstController"
    })
});
