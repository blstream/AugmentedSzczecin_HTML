AugmentedSzczecin.service('apiService', function($http){
    var apiLocation= 'http://private-anon-1813a5f7c-patronage2015.apiary-mock.com/pois';
    $http.get(apiLocation).
        success(function(data, status, headers, config){
           this.getPoi= data;
        }).
        error(function(data, status, headers, config){
            //here will appear Error Handling someday...
        });
});
