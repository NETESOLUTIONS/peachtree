//Ignoring camelcase rules due to rest api names
(function () {
    'use strict';

    angular
        .module('app.food')
        .controller('FoodController', FoodController);

    FoodController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function FoodController($q, dataservice, logger) {
        var vm = this;
        vm.title = 'Food';
        vm.sortType = 'rank';// set the default sort type
        vm.sortReverse = false;// set the default sort order
        vm.searchFilter = '';// set the default search/filter term
        vm.data = [];
        vm.fullData = [];
        vm.states = [];
        vm.ready = false;
        getStatesByCode = getStatesByCode;
        vm.chartData = {
            labels: [],
            series: [
                []
            ]
        };
        vm.top10Filter = top10Filter;
        //Initial activation
        activate();

        function activate() {
            var promises = [getFoodByState(), getStates()];
            return $q.all(promises).then(function() {
                for (var i = 0; i < vm.data.length; i++) {
                    vm.data[i].stateName = getStatesByCode(vm.data[i].term.toUpperCase());
                }
                //the vm data is ready
                vm.ready = true;
                logger.info('Activated Food View');
            });
        }
        //Get listing of top 10 drugs (by AE) from the API
        function getFoodByState() {
            return dataservice.getFoodByState().then(function (data) {
                vm.data = data;
                for (var i = 0; i < 10; i++) {
                    vm.data[i].rank = i + 1;
                    vm.chartData.labels[i] = vm.data[i].term.toUpperCase();
                    vm.chartData.series[0][i] = vm.data[i].count;
                }
                return vm.data;
            });
        }
        //Get listing of states
        function getStates() {
            return dataservice.getStates().then(function (data) {
                vm.states = data;
                return vm.states;
            });
        }
        //Create a lookup function for finding the states fullname
        function getStatesByCode(code) {
            for (var key in vm.states) {
                /* jshint camelcase:false */
                //jscs: disable requireCamelCaseOrUpperCaseIdentifiers
                if (vm.states[key].state_abbreviation === code) {
                    /* jshint camelcase:false */
                    //jscs: disable requireCamelCaseOrUpperCaseIdentifiers
                    return vm.states[key].state_name;
                    /* jshint camelcase:false*/
                }
                /* jshint camelcase:false */
                //jscs: enable requireCamelCaseOrUpperCaseIdentifiers
            }
        }
        //Create a lookup function for finding the states fullname
        function top10Filter(item) {
            if (item.rank) {
                return true;
            }
        }
    }
})();
