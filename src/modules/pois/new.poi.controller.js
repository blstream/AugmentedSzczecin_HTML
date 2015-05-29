AugmentedSzczecin.controller('AddPoiController', ['$scope', '$filter', 'apiService', function($scope, $filter, apiService) {
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

        /**
         * get time from input and save it as string
         */
        var openTime = Date.parse($scope.newPoi.opening.open);
        openTime = new Date(openTime);
        var openHours = openTime.getHours();
        var openMinutes = openTime.getMinutes();
        $scope.newPoi.opening.open = openHours +':' + openMinutes;

        var closeTime = Date.parse($scope.newPoi.opening.close);
        closeTime = new Date(closeTime);
        var closeHours = closeTime.getHours();
        var closeMinutes = closeTime.getMinutes();
        $scope.newPoi.opening.close = closeHours + ":" + closeMinutes;

        $scope.newPoi = angular.toJson(poi);
        /**
         * post new poi to server
         */
        apiService.addPlace($scope.newPoi);
    };
}]);