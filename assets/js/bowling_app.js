define(['marionette'], function (Marionette) {
    'use strict';
    var bowlingApp = new Marionette.Application({
        Apps: {},
        Components: {},
    });
    window.bowlingApp = bowlingApp;
    bowlingApp.launchApp = function () {
        this.welcomePage();
        // call other component
    };
    bowlingApp.addRegions({
        header: '#headerArea',
        bowlingViewArea: '#bowlingView',
        bowlingMessageBar: '#message-bar',
        landingPage: '#landingPage'
    });

    bowlingApp.welcomePage = function (callback) {
        bowlingApp.setCurrentPage('welcomePage');
        requirejs(['apps/welcomePage/welcomePage_app'], function (welcomePageApp) {
            welcomePageApp.trigger('welcomePage');
        });
        if (callback) {
            callback();
        }
    };

    bowlingApp.getCurrentPage = function () {
        return this.currentPage;
    };

    bowlingApp.setCurrentPage = function (currentPage) {
        this.currentPage = currentPage;
    };

    return bowlingApp;
});