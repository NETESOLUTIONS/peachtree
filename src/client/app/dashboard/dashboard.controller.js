/*global Chartist*/
(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.title = 'Dashboard';
        vm.sortType = 'rank'; // set the default sort type
        vm.sortReverse = false; // set the default sort order
        vm.searchFilter = ''; // set the default search/filter term
        vm.changeItem = changeItem;
        vm.activeSelection = 'Drugs';
        vm.data = [];
        vm.chartData = {
            labels: [],
            series: [
                []
            ]
        };
        vm.chartOptions = {
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };
        //Initial activation
        activate();

        function activate() {
            var promises = [getTop10()];
            return $q.all(promises).then(function () {
                logger.info('Activated Dashboard View');
            });
        }

        //Reload the view
        function reload(name) {
                var promises = [getTop10()];
                var activeItem = name;
                return $q.all(promises).then(function () {
                    logger.info('Data loaded for ' + activeItem);
                });
            }
        //Click function to change data
        function changeItem(item) {
                vm.activeSelection = item;
                reload(item);
            }
        //Get listing of top 10 drugs (by AE) from the API
        function getTop10() {
            var functionCall;
            //Determine which dataservice to use
            if (vm.activeSelection === 'Drugs') {
                functionCall = dataservice.getTop10Drugs();
            } else if (vm.activeSelection === 'Devices') {
                functionCall = dataservice.getTop10Devices();
            }
            //Return data based on selection
            return functionCall.then(function (data) {
                vm.data = data;
                for (var i = 0; i < vm.data.length; i++) {
                    vm.data[i].rank = i + 1;
                    if (vm.data[i].term.length === 0 || !vm.data[i].term.trim()) {
                        vm.data[i].term = 'No Value Reported';
                    }
                    vm.chartData.labels[i] = vm.data[i].rank;
                    vm.chartData.series[0][i] = {
                        meta: vm.data[i].term,
                        value: vm.data[i].count
                    };
                }
                return vm.data;
            });
        }
    }
})();
