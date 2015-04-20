AugmentedSzczecin.service('apiService', function($http){
    var that = this,
        apiLocation= 'http://private-anon-1813a5f7c-patronage2015.apiary-mock.com/';

    that.poisUri = apiLocation + 'pois';

    that.getPois = function () {
        return $http.get(that.poisUri)
    };
});
