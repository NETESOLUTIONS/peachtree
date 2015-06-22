(function() {
    'use strict';

    angular
        .module('app.drugs')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'drugs',
                config: {
                    url: '/',
                    templateUrl: 'app/drugs/drugs.html',
                    controller: 'DrugsController',
                    controllerAs: 'vm',
                    title: 'drugs',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-flask"></i> Drugs'
                    }
                }
            }
        ];
    }
})();
