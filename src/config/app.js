var AugmentedSzczecin = angular.module('AugmentedSzczecin',['ui.router']);

AugmentedSzczecin.config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/map");
    $stateProvider
        .state('map',{
        url: "/map",
        templateUrl: "src/templates/map.html",
        controller: 'MapController'
    });
});

// AugmentedSzczecin.run(function ($rootScope){
//
// $rootScope.placeMaker = function(){
// }
// });
