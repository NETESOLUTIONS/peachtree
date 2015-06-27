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
        vm.sortType     = 'term'; // set the default sort type
        vm.sortReverse  = false;  // set the default sort order
        vm.searchFilter   = '';     // set the default search/filter term
        vm.getReactionsFor = getReactionsFor;
        activate();

        function activate() {
            var promises = [getReactions()];
            return $q.all(promises).then(function() {
                logger.info('Activated Drugs View');
            });
        }
        //Get Maximum listing of drugs (by AE) from the API as possible (i.e. 1000)
        function getReactions() {
            return dataservice.getReactions().then(function (data) {
                vm.drugs = data;
                return vm.drugs;
            });
        }
        //Get listing of top 10 drugs (by AE) from the API
        function getReactionsFor() {
            return dataservice.getReactionsFor(vm.drugName).then(function (data) {
                vm.drugs = data;
                return vm.drugs;
            });
        }
    }
})();
