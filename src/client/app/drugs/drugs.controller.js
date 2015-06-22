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
            var promises = [getDrugs()];
            return $q.all(promises).then(function() {
                logger.info('Activated Drugs View');
            });
        }

        function getDrugs() {
            return dataservice.getDrugs().then(function (data) {
                vm.drugs = data;
                console.log(vm.drugs);
                return vm.drugs;
            });
        }
    }
})();
