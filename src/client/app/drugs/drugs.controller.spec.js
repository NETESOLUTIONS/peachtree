/* jshint -W117, -W030 */
describe('DrugsController', function() {
    var controller;
    var drugs = mockData.getMockDrugs();

    beforeEach(function() {
        bard.appModule('app.drugs');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getDrugs').returns($q.when(drugs));
        controller = $controller('DrugsController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Drugs controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Drugs', function () {
                expect(controller.title).to.equal('Drugs');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });

            it('should have at least 1 drug', function () {
                expect(controller.drugs).to.have.length.above(0);
            });

            it('should have drugs count of 10', function () {
                expect(controller.drugs).to.have.length(10);
            });
        });
    });
});
