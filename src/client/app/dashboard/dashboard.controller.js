(function () {
    'use strict';

    angular
        .module('app.dashboard', ['angular-chartist'])
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.drugs = [];
        vm.drugs.charData = [];
        vm.title = 'Dashboard';
        vm.sortType = 'rank'; // set the default sort type
        vm.sortReverse = false;  // set the default sort order
        vm.searchFilter = '';     // set the default search/filter term
        vm.chartData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
                [5, 4, 3, 7, 5, 10, 3]
            ]
        },
        {
            fullWidth: true,
            scaleMinSpace: 200
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
                vm.drugs = data;
                vm.drugs.chartData = {
                    labels: ['ENBREL','REGULAR STRENGTH PAIN RELIEF','HUMIRA','ECOTRIN','BUFFERIN LOW DOSE BUFFERED ASPIRIN','BUFFERIN','BAYER ADVANCED ASPIRIN EXTRA STRENGTH','ENTERIC ASPIRIN','LOW DOSE ASPIRIN ENTERIC SAFETY COATED','ASCRIPTIN REGULAR STRENGTH BUFFERED ASPIRIN'],
                    series: [219582,204860,169284,167516,167170,167170,149468,116464,83165,83033]
                }
                for (var i = 0; i < vm.drugs.results.length; i++) {
                    vm.drugs.results[i].rank = i + 1;
                }
                return vm.drugs;
            });
        }
    }
})();
