(function () {
    'use strict';
    //FDA API Key and base URL
    //Completely Public Key so need to hide it
    var key = 'api_key=gqQrDgeZ9KGNoZnEvminmWmXFwRnFXYDyFoiUZ5S',
        baseUrl = 'https://api.fda.gov/',
        drugUrl = baseUrl + 'drug/event.json?' + key ;
    //dataservice Module Declaration
    angular
        .module('app.core')
        .factory('dataservice', dataservice);
    //Inject the data service
    dataservice.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, logger) {
        var service = {
            getPeople: getPeople,
            getDrugs: getDrugs,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(42); }
        /*
         * Function for getting list of top AE reported drugs
        */
        function getDrugs() {
            return $http.get(drugUrl + '&count=patient.drug.medicinalproduct.exact&limit=1000')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for top drugs failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        /*
         * Example getter function for getting people. Need to remove when up and running
        */
        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for people failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
    }
})();
