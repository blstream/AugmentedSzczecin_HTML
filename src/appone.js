var AppOne = angular.module('AppOne',['ui.router']);

AppOne.controller('FirstController',['$scope','$log', function($scope,$log){
     //MAP OPTIONS
          var mapOptions = {
              center: { lat: 53.428867, lng: 14.556497},
              zoom: 10,
			        scaleControl: true,
              mapTypeId:google.maps.MapTypeId.ROADMAP
           };
     //CREATE NEW MAP
         var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
     //RIGHT CLICK EVENT
          google.maps.event.addListener(map, 'rightclick', function(event) {
          $log.log('rightclick');
          placeMarker(event.latLng);
        });
     //MARKER CREATOR
          function placeMarker(location) {
            var marker = new google.maps.Marker({
            position: location,
            map: map,
          });
            
          var infowindow = new google.maps.InfoWindow({
            content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
            });
          infowindow.open(map,marker);
         }

    //STARTER MARKER
        var myLaTlng = new google.maps.LatLng(53.428867,14.556497);
        var starterMarker = placeMarker(myLaTlng);
   //END OF CONTROLLER   
}]);

AppOne.config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/maps");
    $stateProvider.state('maps',{
        url: "/maps",
        templateUrl: "src/maps.html",
        controller: "FirstController"
    })
});