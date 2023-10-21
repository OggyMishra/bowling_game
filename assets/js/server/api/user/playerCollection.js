if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function (require) {
    var player = require('server/api/user/player');
    var playerCollection = (function () {
        var playerInstance, userCollection = [];
        return {
            addUser: function (userId, userName, cb) {
                userCollection[userId] = {
                    'userId': userId,
                    'userName': userName,
                    'game': new player(),
                    'currentScore': 0
                };
                cb();
            },
            deleteUser: function (userId, cb) {
                // TODO: needs to improve the logic
                var player = this.getPlayer(userId);
                if (player) {
                    userCollection[userId] = null;
                    cb("Your account has been deleted")
                } else {
                    cb("Oops we don't have your account");
                }
            },
            getUserName: function (userId) {
                var player = this.getPlayer(userId);
                if (player) {
                    return player.userName;
                }
            },
            startPlay: function (userId, knockedString, callback) {
                var player = this.getPlayer(userId);
                if (player) {
                    player.game.rollBowl(knockedString);
                    //arbitary added the get score method
                    var result = Number(player.game.getScore());
                    player.currentScore = result;
                    player.game.resetRolls();
                    callback(result);
                } else {
                    callback("error");
                }
            },
            getScore: function (userId, callback) {
                var player = this.getPlayer(userId);
                if (player) {
                    var score = player.currentScore;
                    callback("success", {
                        'userName': player.userName,
                        'score': score ? score : 0
                    });
                } else {
                    callback("error");
                }
            },
            doesPlayerExist: function (userId) {
                return userCollection[userId] ? true : false;
            },
            getPlayer: function (userId) {
                var isPlayerExist = this.doesPlayerExist(userId);
                if (isPlayerExist) {
                    return userCollection[userId];
                }
            }
        };
    })();
    return playerCollection;
});