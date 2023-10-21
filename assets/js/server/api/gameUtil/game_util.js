if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function (require) {
    var game = (function () {
        var rolls = [];
        currentRolls = 0;
        isStrike = function (frameIndex) {
                return rolls[frameIndex] === 10;
            },
            isSpare = function (frameIndex) {
                return rolls[frameIndex] + rolls[frameIndex + 1] === 10;
            },
            spareBonus = function (frameIndex) {
                return rolls[frameIndex + 2];
            },
            strikeBonus = function (frameIndex) {
                var pIndex = rolls[frameIndex + 1],
                    sIndex = rolls[frameIndex + 2];
                return pIndex + sIndex;
            },
            sumOfBallsInFrame = function (frameIndex) {
                return rolls[frameIndex] + rolls[frameIndex + 1];
            }
        return {
            reInitiateRolls: function () {
                rolls = [];
                currentRolls = 0;
            },
            roller: function (pins) {
                rolls[currentRolls++] = pins;
            },
            makeScore: function () {
                var score = 0;
                var frameIndex = 0;
                for (var fIndex = 0; fIndex < 10; fIndex++) {
                    if (isStrike(frameIndex)) {
                        var bonus = strikeBonus(frameIndex)
                        score += 10 + bonus;
                        frameIndex++;
                    } else if (isSpare(frameIndex)) {
                        var bonus = spareBonus(frameIndex);
                        score += 10 + bonus;
                        frameIndex += 2;
                    } else {
                        score += sumOfBallsInFrame(frameIndex);
                        frameIndex += 2;
                    }
                }
                return score;
            },
        }
    })();
    return game;
});