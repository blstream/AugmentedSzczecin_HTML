var AugmentedSzczecin = angular.module('AugmentedSzczecin',['ui.router']);

AugmentedSzczecin.config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/map");
    $stateProvider
        .state('map',{
        url: "/map",
        templateUrl: "src/modules/maps/maps.tmpl.html",
        controller: 'MapController'
    });
});

AugmentedSzczecin.run(function ($rootScope){
    $rootScope.$on('apiError', function(e, data) {
        console.log(data);
    });
});
