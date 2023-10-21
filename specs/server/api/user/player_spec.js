describe('playerGame', function () {
    var playerModule;
    beforeEach(function (done) {
        requirejs(['server/api/user/player'], function (module) {
            playerModule = new module();
            done();
        });
    });
    describe('knockDownPins', function () {
        it('should return perfect score of 300 when all are strike', function () {
            playerModule.rollBowl("XXXXXXXXXXXX");
            expect(playerModule.getScore()).to.eql(300);
            playerModule.resetRolls();
        });

        it('should return score of 150 when spare', function () {
            playerModule.rollBowl("5/5/5/5/5/5/5/5/5/5/5");
            expect(playerModule.getScore()).to.eql(150);
            playerModule.resetRolls();
        });
        it('should return score of 90 when spare', function () {
            playerModule.rollBowl("90909090909090909090");
            expect(playerModule.getScore()).to.eql(90);
            playerModule.resetRolls();
        });
        it('should return score of 113 when spare', function () {
            playerModule.rollBowl("01273/X5/7/345400X70");
            expect(playerModule.getScore()).to.eql(113);
            playerModule.resetRolls();
        });
        it('should return perfect score of 167 when spare', function () {
            playerModule.rollBowl("X7/90X088/06XXX81");
            expect(playerModule.getScore()).to.eql(167);
            playerModule.resetRolls();
        });
        it('should return perfect score of 168 when spare', function () {
            playerModule.rollBowl('X7/729/XXX236/7/3');
            expect(playerModule.getScore()).to.eql(168);
            playerModule.resetRolls();
        });
        it('should return perfect score of 0 when spare', function () {
            playerModule.rollBowl('00000000000000000000');
            expect(playerModule.getScore()).to.eql(0);
            playerModule.resetRolls();
        });
        
    });
});