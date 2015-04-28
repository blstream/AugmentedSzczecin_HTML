var AugmentedSzczecin = angular.module('AugmentedSzczecin',['ui.router']);

AugmentedSzczecin.config(function ($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/map");
  $stateProvider
    .state('map',{
      url: "/map",
      templateUrl: "src/modules/maps/maps.tmpl.html",
      controller: 'MapController'
    })
    .state('login', {
      url: "/login",
      templateUrl: "src/modules/auth/login.tmpl.html",
      controller: "LoginController"
    });
});

// AugmentedSzczecin.run(function ($rootScope){
//
// $rootScope.placeMaker = function(){
// }
// });
