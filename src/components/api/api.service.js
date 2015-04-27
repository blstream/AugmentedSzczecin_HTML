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
        return $http.get(poisUri)
    };
    /** create new POI */
    that.createPoi = function () {
        return $http.post(poisUri)
    };
    /** retrieve single POI */
    that.getPoiById = function (id) {
        return $http.get(poisUri + '/' + id)
    };
    /**update single POI */
    that.updatePoi = function (id) {
        return $http.put(poisUri + '/' + id)
    };
    /**delete single POI */
    that.deletePoi = function (id) {
        return $http.delete(poisUri + '/' + id)
    };
});
