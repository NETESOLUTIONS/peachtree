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
        vm.sortType = 'rank'; // set the default sort type
        vm.sortReverse = false;  // set the default sort order
        vm.searchFilter = '';     // set the default search/filter term
        vm.data = [];
        vm.fullData = [];
        vm.states = [];
        getStatesByCode = getStatesByCode;
        vm.chartData = {
            labels: [],
            series: [
                []
            ]
        };
        //Initial activation
        activate();

        function activate() {
            var promises = [getFoodByStateTop10(), getStates()];
            return $q.all(promises).then(function() {
                for (var i = 0; i < vm.data.length; i++) {
                    vm.data[i].stateName = getStatesByCode(vm.data[i].term.toUpperCase());
                }
                logger.info('Activated Dashboard View');
            });
        }
        //Get listing of top 10 drugs (by AE) from the API
        function getFoodByStateTop10() {
            return dataservice.getFoodByStateTop10().then(function (data) {
                vm.data = data;
                for (var i = 0; i < vm.data.length; i++) {
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
                if( vm.states[key].state_abbreviation === code ){
                    return vm.states[key].state_name;
                }
            }
        }
    }
})();
