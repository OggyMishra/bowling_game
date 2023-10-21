define([
  'bowling_app', 'apps/apiRequester/api_request_controller', 'server/api/user/playerCollection',
  'tpl!apps/welcomePage/list/welcomePageTemplates/welcomePage.tpl',
], function (bowlingApp, apiRequester, playerCollection, welcomePageTpl) {
    bowlingApp.module('HeaderApp.List.View', function (welcomeView, bowlingApp) {
        welcomeView.welcomePageView = Marionette.ItemView.extend({
            template: _.template('<div class="row"><div class="col-lg-12 text-center v-center"><h1>Bowling Exercise</h1><p class="lead">A simple bowling scorer</p><br><br><br><form class="col-lg-12"><div class="input-group" style="width:340px;text-align:center;margin:0 auto;"><span class="input-group-btn"><button id="addUserBtn" class="btn btn-lg btn-primary" type="button">Add User</button></span><br><br><br></div><div class="input-group" style="width:340px;text-align:center;margin:0 auto;"></div><div class="input-group" style="width:340px;text-align:center;margin:0 auto;"><span class="input-group-btn"><button id="deleteUserBtn" class="btn btn-lg btn-primary" type="button">Delete User</button></span><br><br><br></div><div class="input-group" style="width:340px;text-align:center;margin:0 auto;"><span class="input-group-btn"><button id="playGameBtn" class="btn btn-lg btn-primary" type="button">Play Game</button></span><br><br><br></div><div class="input-group" style="width:340px;text-align:center;margin:0 auto;"><span class="input-group-btn"><button id="realTimePlayBtn" class="btn btn-lg btn-primary" type="button">Real Time Play</button></span><br><br><br></div><div class="input-group" style="width:340px;text-align:center;margin:0 auto;"><span class="input-group-btn"><button id="getScoreBtn" class="btn btn-lg btn-primary" type="button">Get Score</button></span><br><br><br></div></form></div></div>'),
            className: 'container-full',
            tagName: 'div',
            initialize: function (options) {
                this.model = options.model;
            },
            events: {
                'click #addUserBtn': 'handleNewUserCreation',
                'click #deleteUserBtn': 'handleDeleteUser',
                'click #playGameBtn': 'handlePlayGame',
                'click #realTimePlayBtn': 'handleRealTimePlay',
                'click #getScoreBtn': 'handleGetScore',
            },
            handleNewUserCreation: function () {
                $('#AddUserModal').modal('show');
                $('#modalBtnAddUser').click(function () {
                    var userId = $('#addUserIdTxt').val(),
                        userName = $('#addUserNameTxt').val();
                    playerCollection.addUser(userId, userName, function () {
                        $('#AddUserModal').modal('hide');
                        $('#ResultView').modal('show');
                        $('#resultView').text("Hi " + userName + " you are ready to play the game!!");
                    });

                    //TODO: Make thsi call using ajax
                    //                    apiRequester.addUserRequest(userId, userName, function () {
                    //                       
                    //                        
                    //                    });
                });
            },
            handleDeleteUser: function () {
                $('#RemoveUserModal').modal('show');
                $('#modalBtnDelete').click(function () {
                    var userId = $('#removeUserIdTxt').val();
                    playerCollection.deleteUser(userId, function (status) {
                        $('#RemoveUserModal').modal('hide');
                        $('#ResultView').modal('show');
                        $('#resultView').text(status);
                    });
                });
            },
            handlePlayGame: function () {
                $('#PlayGameModal').modal('show');
                $('#modalBtnSave').click(function () {
                    var userId = $('#playGameUserIdTxt').val(),
                        pinsKnockedString = $('#playGamePinsKnockDownTxt').val();
                    playerCollection.startPlay(userId, pinsKnockedString, function (status) {
                        $('#PlayGameModal').modal('hide');
                        $('#ResultView').modal('show');
                        if (status == "error") {
                            $('#resultView').text("Oops you were not there in system!!");
                        } else {
                            $('#resultView').text(status);
                        }
                    });
                });
            },
            handleRealTimePlay: function () {
                $('#RealTimePlayModal').modal('show');
                $('#modalBtnRealPlay').click(function () {
                    var userId = $('#realTimePlayUserIdTxt').val(),
                        pinsKnockDown = $('#realTimePlayPinsDownTxt').val();
                });
            },
            handleGetScore: function () {
                $('#GetScoreModal').modal('show');
                $('#modalBtnShowScore').click(function () {
                    var userId = $('#scoreBtnUserIdTxt').val();
                    playerCollection.getScore(userId, function (status, result) {
                        $('#GetScoreModal').modal('hide');
                        $('#ResultView').modal('show');
                        if (result) {
                            $('#resultView').text("hey " +
                                result.userName + " your score is " + result.score);
                        } else {
                            $('#resultView').text("I see some problem in you");
                        }
                    });
                });
            },
        });
    });
    return bowlingApp.HeaderApp.List.View;
});