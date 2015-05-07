AugmentedSzczecin.controller('AddPoiController', ['$scope', 'apiService', function($scope, apiService) {
    $scope.addPoi = function(poi) {
        $scope.newPoi = angular.toJson(poi);
        apiService.createPoi($scope.newPoi);
        console.log($scope.newPoi);
    };
}]);