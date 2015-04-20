/**
 * General purpose API handler
 *
 * @constructs apiService
 * @param $http
 */
AugmentedSzczecin.service('apiService', function($http){
    var that = this, // we need global scope of this servie in different places
        apiLocation= 'http://private-anon-1813a5f7c-patronage2015.apiary-mock.com/';

    // URLs required for api calls
    var poisUri = apiLocation + 'pois';

    /**
     * get pois from server (api server)
     * @memberof apiService
     */
    that.getPois = function () {
        return $http.get(that.poisUri)
    };
});
