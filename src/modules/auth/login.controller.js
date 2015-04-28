/**
 * @author Wiktor Rutka <wiktor.rutka@blstream.com>
 */

AugmentedSzczecin.controller('LoginController', ['$scope', 'ipCookie', function($scope, ipCookie) {
  $scope.user = {};

  /**
   * Save username and password into cookie
   * @param user {Object} - user.email, user.password
   */
  $scope.loginAction = function (user) {
    ipCookie('user', user);
AugmentedSzczecin.controller('LoginController', ['$scope', function($scope) {
  $scope.user = {};

  $scope.loginAction = function (user) {
    console.log(user.email, user.password);
  }
}]);
