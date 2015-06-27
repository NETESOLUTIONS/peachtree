/* jshint -W117, -W030 */
describe('Food Routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/foods/food.html';

        beforeEach(function() {
            module('app.food', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state food to url /food ', function() {
            expect($state.href('food', {})).to.equal('/food');
        });

        it('should map /food route to food View template', function () {
            expect($state.get('food').templateUrl).to.equal(view);
        });

        it('of food should work with $state.go', function () {
            $state.go('food');
            $rootScope.$apply();
            expect($state.is('food'));
        });
    });
});
