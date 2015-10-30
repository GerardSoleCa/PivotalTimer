/**
 * Created by gerard on 10/30/15.
 */
var pivotalServices = angular.module('timingService', ['LocalStorageModule']);

pivotalServices.factory('Timing', ['$http', 'localStorageService', function ($http, localStorageService) {

    var services = {};

    services.start = function (id) {
        var date = new Date();
        var data = localStorageService.get(id);
        if (!(data instanceof Array)) {
            data = [];
        }
        data.push({
            start: date
        });
        localStorageService.set(id, data);
    };

    services.stop = function (id) {
        var date = new Date();
        var data = localStorageService.get(id);
        data[data.length - 1].end = date;
        localStorageService.set(id, data);
    };

    services.isRunning = function (id) {
        var data = localStorageService.get(id);
        if (data instanceof Array) {
            return !data[data.length - 1].end;
        } else {
            return false;
        }
    };

    return services;
}]);