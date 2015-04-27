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
    that.createPoi = function (data) {
        return $http.post(poisUri, data)
    };
    /** retrieve single POI */
    that.getPoiById = function (id) {
        return $http.get(poisUri + '/' + id)
    };
    /**update single POI */
    that.updatePoi = function (id, data) {
        return $http.put(poisUri + '/' + id, data)
    };
    /**delete single POI */
    that.deletePoi = function (id) {
        return $http.delete(poisUri + '/' + id)
    };
    //uri for all events
    var eventsUri = apiLocation + 'events';

    /** get all events */
    that.getEvents = function () {
        return $http.get(eventsUri)
    };
    /** add new event */
    that.addEvent = function (data) {
        return $http.post(eventsUri, data)
    };
    /**retrieve single event */
    that.retrieveEvent = function (id) {
        return $http.get(eventsUri + '/' + id)
    };
    /** update single event */
    that.updateEvent = function (id, data) {
        return $http.put(eventsUri + '/' + id, data)
    };
    /**delete single event */
    that.deleteEvent = function (id) {
        return $http.delete(eventsUri + '/' + id)
    };
});
