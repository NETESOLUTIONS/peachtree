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
        vm.sortReverse = false;  // set the default sort order
        vm.searchFilter = '';     // set the default search/filter term
        vm.changeItem = changeItem;
        vm.activeSelection = 'Drugs';
        vm.data = [];
        vm.chartData = {
            labels: [],
            series: [
                []
            ]
        };
        //Initial activation
        activate();
        // Is this for chart animations?
        // todo: Refactor this to make not use JQuery
        // function hideChart() {
        //     $('chartist').addClass('out');
        // }
        // function showChart() {
        //     setTimeout( function() {
        //         $('chartist').removeClass('out');
        //     }, 10);
        // }

        function activate() {
            var promises = [getTop10()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }
        //Reload the view
        function reload(name) {
            var promises = [getTop10()];
            var activeItem = name;
            return $q.all(promises).then(function() {
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
            // todo see comment line 29
            // hideChart();
            //Return data based on selection
            return functionCall.then(function (data) {
                vm.data = data;
                console.log(vm.data);
                for (var i = 0; i < vm.data.length; i++) {
                    vm.data[i].rank = i + 1;
                    vm.chartData.labels[i] = vm.data[i].term;
                    vm.chartData.series[0][i] = vm.data[i].count;
                }
                // todo see comment line 29
                // showChart();
                return vm.data;
            });
        }
    }
})();
