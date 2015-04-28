/**
 * @author Wiktor Rutka <wiktor.rutka@blstream.com>
 */

AugmentedSzczecin.controller('LoginController', ['$scope', function($scope) {
  $scope.user = {};

  $scope.loginAction = function (user) {
    console.log(user.email, user.password);
  }
}]);
