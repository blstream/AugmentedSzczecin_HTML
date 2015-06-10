AugmentedSzczecin.controller('RegistrationController', ['$scope', 'apiService', '$state', function($scope, apiService, $state) {
    $scope.signUp = function(user) {
        $scope.newUser = user;
        console.log($scope.newUser);
        apiService.addUser($scope.newUser)
            .success(function(data, status, headers, config){
                $scope.newUser = data;
            }).error(function(data, status, headers, config){
                $scope.$emit('apiError', data, status, headers, config);
            });
        $state.go('map');
    };
}]);