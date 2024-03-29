/* jshint -W117, -W030 */
describe('DashboardController', function() {
    var controller;
    var drugs = mockData.getMockDrugs();

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getTop10Drugs').returns($q.when(drugs));
        controller = $controller('DashboardController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Dashboard controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Dashboard', function () {
                expect(controller.title).to.equal('Dashboard');
            });
            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
            it('should have at least 1 item', function () {
                expect(controller.data).to.have.length.above(0);
            });
            it('should have data count of 10', function () {
                expect(controller.data).to.have.length(10);
            });
        });
    });
});
