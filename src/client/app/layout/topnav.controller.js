(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('TopnavController', TopnavController);

    TopnavController.$inject = ['$state', 'routerHelper'];
    /* @ngInject */
    function TopnavController($state, routerHelper) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        vm.navline = {
            title: 'peachtree',
            text: 'Created By Net Esolutions',
            link: 'https://www.facebook.com/pages/' +
                  'NET-eSolutions-Corporation/158854007505791?fref=ts'
        };

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function(r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();
