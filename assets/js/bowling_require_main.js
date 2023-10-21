requirejs.config({
    baseUrl: 'assets/js',
    waitSeconds: 0,
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'underscore': 'vendor/underscore/underscore',
        'backbone': 'vendor/backbone/backbone',
        'marionette': 'vendor/backbone.marionette/lib/backbone.marionette',
        'json': 'vendor/require/src/json',
        'json2': 'vendor/json2',
        'text': 'vendor/text',
        'tpl': 'vendor/underscore-tpl',
    },
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'tpl': ['text'],
        'underscore': {
            exports: '_'
        }
    },
});
requirejs([
    'bowling_app',
    'common/config'
], function (bowlingApp, bowlingAppConfig) {
    bowlingApp.launchApp();
    bowlingAppConfig.loadConfig();
});