/* jshint -W117, -W030 */
describe('DashboardController', function() {
    var controller;
    var people = mockData.getMockPeople();
    var drugs = mockData.getMockDrugsTop10();

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getPeople').returns($q.when(people));
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
            it('should have at least 1 drugs', function () {
                expect(controller.drugs).to.have.length.above(0);
            });
            //Removing count mock counts from controlling testing.
            // it('should have drugs count of 5', function () {
            //     expect(controller.people).to.have.length(6);
            // });
        });
    });
});
