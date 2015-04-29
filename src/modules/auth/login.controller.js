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
  };
}]);
