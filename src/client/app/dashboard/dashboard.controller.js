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
        vm.drugs.charData = [];
        vm.title = 'Dashboard';

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
                return vm.drugs;
            });
        }
    }
})();
