define(['bowling_app', 'common/config'], function (bowlingApp, bowlingAppConfig) {
    bowlingApp.module('apiRequester', function (apiRequester, bowlingApp) {
        apiRequester.controller = {
            addUserRequest: function (userId, userName, cb) {
                $.ajax({
                    url: "http://localhost:8124/api",
                    type: "POST",
                    headers: {
                    "Content-type": "application/json"
                    },
                    data: {
                        "userId": userId,
                        "userName": userName
                    },
                    dataType:'jsonp',
                    jsonp:false,
                    jsonpCallback: "myJsonMethod",
                    timeout: bowlingAppConfig.getTimeOutInterval(),
                    success: function (data) {
                        debugger;
                        if (cb) {
                            cb(data);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (textStatus == "timeout") {
                            console.log("network issue");
                        }
                    }
                });
            }
        };
    });
    return bowlingApp.apiRequester.controller;
});