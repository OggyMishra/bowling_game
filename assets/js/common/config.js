define(['bowling_app'], function (bowlingApp) {
    'use strict';
    bowlingApp.module('Config', function (Config, bowlingApp, Backbone, Marionette, $, _) {
        Config.Controller = {
            loadConfig: function (callback) {
                this.setBaseUrl("http://localhost:3031/");
                this.setAddUserAPIUrl("api/addNewUser");
                this.setDeleteUserAPIUrl("api/deleteUser");
                this.setGamePlayAPIUrl("api/play");
                this.setScoreAPIUrl("api/score");
                this.setRealTimPlayAPIUrl("api/realtimeplay");
            },
            getTimeOutInterval: function () {
                return 60000;
            },
            getBaseUrl: function () {
                return this.baseUrl;
            },
            setBaseUrl: function (url) {
                this.baseUrl = url;
            },
            getAddUserAPIUrl: function () {
                return this.addUserApi;
            },
            getDeleteUserAPIUrl: function () {
                return this.deleteUserApi;
            },
            getGamePlayAPIUrl: function () {
                return this.playGameApi;
            },
            getScoreAPIUrl: function () {
                return this.scoreApi;
            },
            getRealTimPlayAPIUrl: function () {
                return this.realTimePlayApi;
            },
            setAddUserAPIUrl: function (addUser) {
                this.addUserApi = addUser;
            },
            setDeleteUserAPIUrl: function (deleteUser) {
                this.deleteUserApi = deleteUser;
            },
            setGamePlayAPIUrl: function (playgame) {
                this.playGameApi = playgame;
            },
            setScoreAPIUrl: function (score) {
                this.scoreApi = score;
            },
            setRealTimPlayAPIUrl: function (realTimePlay) {
                this.realTimePlayApi = realTimePlay;
            }
        };
    });
    var bowlingConfig = bowlingApp.Config.Controller;
    window.bowlingConfig = bowlingConfig;
    return bowlingConfig;
});