AugmentedSzczecin.controller('AddPoiController', ['$scope', 'apiService', function($scope, apiService) {
    $scope.addPoi = function(poi) {
        $scope.newPoi = poi;
        /**
         * Saves checked days of the week as array with their names
         */
        daysMappings = { "monday": "MONDAY", "tuesday":"TUESDAY", "wednesday":"WEDNESDAY", "thursday": "THURSDAY", "friday":"FRIDAY", "saturday":"SATURDAY", "sunday":"SUNDAY"};
        daysList = [];
        for(day in $scope.newPoi['opening']['day']) {
            if ($scope.newPoi['opening']['day'][day]) {
                daysList.push(daysMappings[day]);
            }
        }
        $scope.newPoi.opening.day = daysList;
        $scope.newPoi = angular.toJson(poi);
        /**
         * post new poi to server
         */
        apiService.addPlace($scope.newPoi);
    };
}]);