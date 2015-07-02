/* jshint -W117, -W030 */
describe('FoodController', function() {
    var controller;
    var drugs = mockData.getMockDrugs();

    beforeEach(function() {
        bard.appModule('app.food');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');
    });

    beforeEach(function () {
        sinon.stub(dataservice, 'getFoodByState').returns($q.when(drugs));
        sinon.stub(dataservice, 'getStates').returns($q.when(drugs));
        controller = $controller('FoodController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Food controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Food', function () {
                expect(controller.title).to.equal('Food');
            });
            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
            it('should have at least 1 item', function () {
                console.log(controller.data.length);
                expect(controller.data).to.have.length.above(0);
            });
            //Checking against same data each time
            it('should have drugs count of 10', function () {
                expect(controller.data).to.have.length(10);
            });
        });
    });
});
