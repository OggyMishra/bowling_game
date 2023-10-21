define(['bowling_app', 'apps/welcomePage/list/list_controller'],
    function (bowlingApp, listController) {
        bowlingApp.module('HeaderApp', function (header, bowlingApp) {
            var API = {
                listHeader: function () {
                    listController.listHeader();
                }
            };
            header.on('welcomePage', function () {
                console.log("welocome page has been called");
                API.listHeader();
            });
        });
        return bowlingApp.HeaderApp;
    });