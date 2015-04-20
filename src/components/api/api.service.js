AugmentedSzczecin.service('apiService', function($http){
    var that = this,
        apiLocation= 'http://private-anon-1813a5f7c-patronage2015.apiary-mock.com/pois';

    that.pois = [];

    $http.get(apiLocation)
        .success(function(data, status, headers, config){
           that.pois = data;
        })
        .error(function(data, status, headers, config){
            //here will appear Error Handling someday...
        });
});
