var AugmentedSzczecin = angular.module('AugmentedSzczecin',['ui.router', 'ipCookie']);

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

AugmentedSzczecin.run(['$rootScope', '$state', 'ipCookie', function ($rootScope, $state, ipCookie){
  $rootScope.$on('apiError', function(e, data) {
    console.log(data);
  });

  if (!ipCookie('user')) {
    console.log($state);
    $state.go('login');
  }
}]);
