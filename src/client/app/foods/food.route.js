(function() {
    'use strict';

    angular
        .module('app.food')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'food',
                config: {
                    url: '/food',
                    templateUrl: 'app/foods/food.html',
                    controller: 'FoodController',
                    controllerAs: 'vm',
                    title: 'Food',
                    settings: {
                        nav: 2,
                        content: 'Food'
                    }
                }
            }
        ];
    }
})();
