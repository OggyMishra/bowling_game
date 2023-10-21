describe('gameUtilSpec', function () {
    var gameUtil;
    beforeEach(function (done) {
        requirejs(['server/api/gameUtil/game_util'], function (module) {
            gameUtil = module;
            done();
        });
    });
    describe('Initialization', function () {
        it('should be able to be instantiated', function () {
            var gUtil = gameUtil;
            expect(gUtil instanceof gameUtil.constructor).to.be.true;
            expect(typeof (gUtil)).to.equal('object');
        });
    });

    describe('knockDownPins', function () {
        function rollerHelper(n, pins) {
            for (var i = 0; i < n; i++)
                gameUtil.roller(pins);
        }
        it('should return perfect score of 300 when all are strike', function () {
            rollerHelper(12, 10);
            expect(gameUtil.makeScore()).to.eql(300);
            //Cleanup
            gameUtil.reInitiateRolls();
        });
        it('should return 0 when there is no hit', function () {
            rollerHelper(21, 0);
            expect(gameUtil.makeScore()).to.eql(0);
            //Cleanup
            gameUtil.reInitiateRolls();
        });
        it('should return 150 when spare ', function () {
            rollerHelper(21, 5);
            expect(gameUtil.makeScore()).to.eql(150);
            //Cleanup
            gameUtil.reInitiateRolls();
        });
        //        it('should return perfect score of 300', function () {
        //            rollerHelper(12, 10);
        //            expect(gameUtil.makeScore()).to.eql(300);
        //        });
        //        it('should return perfect score of 300', function () {
        //            rollerHelper(12, 10);
        //            expect(gameUtil.makeScore()).to.eql(300);
        //        });
        //        it('should return perfect score of 300', function () {
        //            rollerHelper(12, 10);
        //            expect(gameUtil.makeScore()).to.eql(300);
        //        });
    });
});