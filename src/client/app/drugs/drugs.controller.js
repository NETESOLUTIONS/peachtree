(function () {
    'use strict';

    angular
        .module('app.drugs')
        .controller('DrugsController', DrugsController);

    DrugsController.$inject = ['$q', 'dataservice', 'logger', '$scope'];
    /* @ngInject */
    function DrugsController($q, dataservice, logger, $scope) {
        var vm = this;
        vm.drugs = [];
        vm.title = 'Drugs';
        $scope.sortType     = 'term'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFilter   = '';     // set the default search/filter term

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
