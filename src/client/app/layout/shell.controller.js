/*global $, jQuery*/
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
            //skip navigation script to move focus to content area for 508 compliance
            $('#skip-nav').click(function (event) {
                var skipTo = '#' + this.href.split('#')[1];
                $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
                    $(this).removeAttr('tabindex');
                    history.replaceState({} , '', '');
                }).focus();
            });
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();
