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
    })
      .state('start', {
          url: '/start',
          templateUrl: 'src/modules/start/start.tmpl.html'
      })
      .state('about', {
          url: '/about',
          templateUrl: 'src/modules/about/about.tmpl.html'
      })
      .state('register', {
          url: '/register',
          templateUrl: 'src/modules/registration/registration.tmpl.html'
      })
      .state('search', {
          url: '/search',
          templateUrl: 'src/modules/search/search.tmpl.html',
          controller: 'SearchController'
      })

});

AugmentedSzczecin.run(['$rootScope', '$state', 'ipCookie', '$window', function ($rootScope, $state, ipCookie, $window){
  $rootScope.$on('apiError', function(e, data, status, headers, config ) {
      console.log(config.method);
      alert('wystąpił błąd podczas połączenia z serwerem aplikacji ' + ' METHOD: ' + config.method
     + ' URL: ' + config.url );
  });

  if (!ipCookie('user')) {
    $window.location = '/#/login';
    $state.go('login');
  }
}]);

AugmentedSzczecin.directive('formTemplate', function() {
      return {
          restrict: "E",
          templateUrl: "/src/modules/pois/new.poi.tmpl.html", 
      };
    });