AugmentedSzczecin.controller('AddPoiController', ['$scope', 'apiService', function($scope, apiService) {
    $scope.addPoi = function(poi) {
        $scope.newPoi = angular.toJson(poi);
        apiService.addPlace($scope.newPoi);
        console.log($scope.newPoi);
    };
}]);