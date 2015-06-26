(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.drugs = [];
        vm.drugs.chartData = [];
        vm.title = 'Dashboard';
        vm.sortType = 'rank'; // set the default sort type
        vm.sortReverse = false;  // set the default sort order
        vm.searchFilter = '';     // set the default search/filter term
        vm.chartData = {
            labels: [],
            series: [
                []
            ]
        };

        activate();

        function activate() {
            var promises = [getTop10Drugs()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        //Get listing of top 10 drugs (by AE) from the API
        function getTop10Drugs() {
            return dataservice.getTop10Drugs().then(function (data) {
                vm.drugs = data.results;
                for (var i = 0; i < vm.drugs.length; i++) {
                    vm.drugs[i].rank = i + 1;
                    vm.chartData.labels[i] = vm.drugs[i].term;
                    vm.chartData.series[0][i] = vm.drugs[i].count;
                }
                return vm.drugs;
            });
        }
    }
})();
