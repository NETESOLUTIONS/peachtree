/* jshint -W117, -W030 */
describe('drugs routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/drugs/drugs.html';

        beforeEach(function() {
            module('app.drugs', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state dashboard to url / ', function() {
            expect($state.href('drugs', {})).to.equal('/');
        });

        it('should map /drugs route to dashboard View template', function () {
            expect($state.get('drugs').templateUrl).to.equal(view);
        });

        it('of drugs should work with $state.go', function () {
            $state.go('drugs');
            $rootScope.$apply();
            expect($state.is('drugs'));
        });
    });
});
