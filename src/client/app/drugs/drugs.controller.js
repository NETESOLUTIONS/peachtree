(function () {
    'use strict';

    angular
        .module('app.drugs')
        .controller('DrugsController', DrugsController);

    DrugsController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DrugsController($q, dataservice, logger) {
        var vm = this;
        vm.drugs = [];
        vm.title = 'Drugs';

        activate();

        function activate() {
            var promises = [getDrugs(), getTop10Drugs()];
            return $q.all(promises).then(function() {
                logger.info('Activated Drugs View');
            });
        }
        //Get Maximum listing of drugs (by AE) from the API as possible (i.e. 1000)
        function getDrugs() {
            return dataservice.getDrugs().then(function (data) {
                vm.drugs = data;
                return vm.drugs;
            });
        }
        //Get listing of top 10 drugs (by AE) from the API
        function getTop10Drugs() {
            return dataservice.getTop10Drugs().then(function (data) {
                vm.drugsTop10 = data;
                return vm.drugsTop10;
            });
        }
    }
})();
