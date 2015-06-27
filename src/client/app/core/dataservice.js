(function () {
    'use strict';
    //FDA API Key and base URL
    //Completely Public Key so need to hide it
    var key = 'api_key=gqQrDgeZ9KGNoZnEvminmWmXFwRnFXYDyFoiUZ5S',
        baseUrl = 'https://api.fda.gov/',
        drugUrl = baseUrl + 'drug/event.json?' + key,
        deviceUrl = baseUrl + 'device/event.json?' + key,
        foodUrl = baseUrl + 'food/enforcement.json?' + key;
    //dataservice Module Declaration
    angular
        .module('app.core')
        .factory('dataservice', dataservice);
    //Inject the data service
    dataservice.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, logger) {
        var service = {
            getDrugs: getDrugs,
            getTop10Drugs: getTop10Drugs,
            getDevices: getDevices,
            getTop10Devices: getTop10Devices,
            getFoodByState: getFoodByState,
            getFoodByStateTop10: getFoodByStateTop10,
            getReactions: getReactions,
            getReactionsFor: getReactionsFor
        };

        return service;
        /*
         * Function for getting list of top AE reported drugs max api limit
        */
        function getDrugs() {
            return $http.get(drugUrl + '&count=patient.drug.openfda.brand_name.exact&limit=1000')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data.results;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for top drugs failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        /*
         * Function for getting list of top AE reported drugs limit to top 10
        */
        function getTop10Drugs() {
            return $http.get(drugUrl + '&count=patient.drug.openfda.brand_name.exact&limit=10')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data.results;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for top devices failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        /*
         * Function for getting list of top AE reported devices max api limit
        */
        function getDevices() {
            return $http.get(deviceUrl + '&count=device.brand_name.exact&limit=1000')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data.results;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for top devices failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        /*
         * Function for getting list of top AE reported devices limit to top 10
        */
        function getTop10Devices() {
            return $http.get(deviceUrl + '&count=device.brand_name.exact&limit=10')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data.results;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for top drugs failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        /*
         * Function for getting list of top AE reported devices limit to top 10
        */
        function getFoodByState() {
            return $http.get(foodUrl + '&count=state')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data.results;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for top food actions failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        /*
         * Function for getting list of top AE reported devices limit to top 10
        */
        function getFoodByStateTop10() {
            return $http.get(foodUrl + '&count=state&limit=10')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data.results;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for top 10 states failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        /*
         * Function for getting list of Reactions
        */
        function getReactions() {
            return $http.get(drugUrl + '&count=patient.reaction.reactionmeddrapt.exact&limit=1000')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                return response.data.results;
            }
            //define fail function
            function fail(error) {
                var msg = 'query for top drugs failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        /*
         * Function for getting list of top reactions by searching for a certain drug
        */
        function getReactionsFor(drugName) {
            return $http.get(drugUrl + '&search=patient.drug.openfda.brand_name:"' + drugName +
                                       '"&count=patient.reaction.reactionmeddrapt.exact')
                .then(success)
                .catch(fail);
            //define success function
            function success(response) {
                var msg = 'Query for ' + drugName + ' brand successful';
                logger.success(msg);
                return response.data.results;
            }
            //define fail function
            function fail(error) {
                var msg = 'Query for brand ' + drugName + ' failed please try another brand name';
                logger.error(msg);
                return $q.reject(msg);
            }
        }
    }
})();
