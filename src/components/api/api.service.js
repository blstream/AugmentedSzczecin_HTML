AugmentedSzczecin.service('apiService', function($http){
    var that = this,
        apiLocation= 'http://private-anon-1813a5f7c-patronage2015.apiary-mock.com/';

    that.poisUri = apiLocation + 'pois';

    that.getPois = function () {
        $http.get(that.poisUri)
            .success(function(data, status, headers, config){
                return data;
            })
            .error(function(data, status, headers, config){
                return 'Error occured'
                //here will appear Error Handling someday...
            });
    };
});
