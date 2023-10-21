var express = require('express');
var requirejs = require('requirejs');
requirejs.config({
    baseUrl: "assets/js",
    nodeRequire: require
});
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
var router = express.Router();
router.use(function (req, res, next) {
    next();
});
router.get('/', function (req, res) {
    res.json({
        message: 'Welcome User'
    });
});
router.route('/addNewUser').post(function (req, res) {
    var userId = req.body.userId,
        userName = req.body.userName;
    requirejs(['server/api/user/playerCollection'], function (playerCollection) {
        playerCollection.addUser(userId, userName, function () {
            res.json({
                message: 'success'
            });
        });
    });
});

router.route('/deleteUser').post(function (req, res) {
    var userId = req.body.userId;
    requirejs(['server/api/user/playerCollection'], function (playerCollection) {
        playerCollection.deleteUser(userId, function (status) {
            res.json({
                message: status
            });
        });
    });
});
router.route('/play').post(function (req, res) {
    var userId = req.body.userId,
        pinsKnockDown = req.body.pinsKnockDown;
    requirejs(['server/api/user/playerCollection'], function (playerCollection) {
        playerCollection.startPlay(userId, pinsKnockDown, function (status) {
            res.json({
                message: status
            });
        });
    });
});
router.route('/score').post(function (req, res) {
    var userId = req.body.userId;
    requirejs(['server/api/user/playerCollection'], function (playerCollection) {
        playerCollection.startPlay(userId, function (status, score) {
            res.json({
                message: status,
                'score': score
            });
        });
    });
});
router.route('/realtimeplay').post(function (req, res) {
    // TODO: Once muti user system will be enabled it will come into picture
    var userId = req.body.userId,
        oneThrowScore = req.body.score;
    res.json({
        message: 'success',
        currentScore: '10'
    });
});
app.use('/api', router);
app.listen(port);
console.log('Bowling server running on port ' + port);