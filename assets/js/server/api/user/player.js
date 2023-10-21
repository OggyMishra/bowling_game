if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function (require) {
    var gameUtil = require('server/api/gameUtil/game_util');
    var player = function () {
        var userid, username;
        return {
            getUserId: function () {
                return userid;
            },
            setUserId: function (userId) {
                userid = userId;
            },
            getUserName: function () {
                return username;
            },
            setUserName: function (userName) {
                username = userName;
            },
            rollBowl: function (inputString) {
                var previousValue;
                for (var i in inputString) {
                    previousValue = inputString[i - 1];
                    if (inputString[i] == 'x' || inputString[i] == 'X') {
                        gameUtil.roller(10);
                    } else if (inputString[i] == '/') {
                        if (previousValue) {
                            gameUtil.roller(10 - Number(previousValue));
                        }
                    } else {
                        var gutterThrow = Number(inputString[i]);
                        if (gutterThrow || gutterThrow == 0) {
                            gameUtil.roller(gutterThrow);
                        }
                    }
                }
            },
            getScore: function () {
                return gameUtil.makeScore();
            },
            getRunningScore: function () {
                return this.runningScore;
            },
            resetRolls: function () {
                gameUtil.reInitiateRolls();
            }
        };
    };
    return player;
});