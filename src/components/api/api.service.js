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
    //uri for all people
    var peopleUri = apiLocation + 'people';
    /**get list of all people */
    that.getPeople = function () {
        return $http.get(peopleUri)
    };
    /**add new person*/
    that.addPerson = function (data) {
        return $http.post(peopleUri, data)
    };
    /**retrieve person*/
    that.retrievePerson = function (id) {
        return $http.get(peopleUri + '/' + id)
    };
    /** update person */
    that.updatePerson = function (id, data) {
        return $http.put(peopleUri + '/' + id, data)
    };
    /** delete person */
    that.deletePerson = function (id) {
        return $http.delete(peopleUri + '/' + id)
    };
    //uri for all places
    var placesUri = apiLocation + 'places';

    /**get list of all places*/
    that.getPlaces = function () {
        return $http.get(placesUri)
    };
    /** add new place */
    that.addPlace = function (data) {
        return $http.post(placesUri, data)
    };
    /** retrieve single place */
    that.retrievePlace = function (id) {
        return $http.get(placesUri + '/' + id)
    };
    /** update single place */
    that.updatePlace = function (id, data) {
        return $http.put(placesUri + '/' + id, data)
    };
    /** delete single place */
    that.deletePlace = function (id) {
        return $http.delete(placesUri + '/' + id)
    };
});
