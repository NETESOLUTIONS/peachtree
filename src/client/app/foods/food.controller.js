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
        vm.chartData = {
            labels: [],
            series: [
                []
            ]
        };
        //Initial activation
        activate();

        function activate() {
            var promises = [getFoodByStateTop10()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }
        //Get listing of top 10 drugs (by AE) from the API
        function getFoodByStateTop10() {
            return dataservice.getFoodByStateTop10().then(function (data) {
                vm.data = data;
                for (var i = 0; i < vm.data.length; i++) {
                    vm.data[i].rank = i + 1;
                    vm.chartData.labels[i] = vm.data[i].term;
                    vm.chartData.series[0][i] = vm.data[i].count;
                }
                return vm.data;
            });
        }
    }
})();
