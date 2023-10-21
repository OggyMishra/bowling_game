define(['bowling_app',
        'apps/welcomePage/list/list_view', 'common/config'], function (bowlingApp, welocomeView, bowlingAppConfig) {
    bowlingApp.module('WelcomePageApp.List', function (List, bowlingApp) {
        List.Controller = {
            listHeader: function () {
                var welcomePageModel = "abcd", //bowlingApp.request('welcomePage:entities'),
                    welcomePageView = new welocomeView.welcomePageView({
                    });
                bowlingApp.landingPage.show(welcomePageView);
            }
        };
    });
    return bowlingApp.WelcomePageApp.List.Controller;
});