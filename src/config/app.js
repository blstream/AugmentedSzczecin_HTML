var AugmentedSzczecin = angular.module('AugmentedSzczecin',['ui.router']);
/**
 * [description]
 * @param  {[type]} $stateProvider        [description]
 * @param  {[type]} $urlRouterProvider){                 $urlRouterProvider.otherwise("/map");    $stateProvider        .state('map',{        url: "/map",        templateUrl: "src/templates/map.html",        controller: 'MapController'    });} [description]
 * @return {[type]}                       [description]
 */
AugmentedSzczecin.config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/map");
    $stateProvider
        .state('map',{
        url: "/map",
        templateUrl: "src/templates/map.html",
        controller: 'MapController'
    });
});
