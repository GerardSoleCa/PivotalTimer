/**
 * Created by gerard on 10/30/15.
 */
var pivotalServices = angular.module('pivotalServices', ['LocalStorageModule']);

pivotalServices.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('pivotalServices');
}]);

pivotalServices.factory('Pivotal', ['$http', 'localStorageService', function ($http, localStorageService) {
    var PIVOTAL = 'https://www.pivotaltracker.com/services/v5/';

    var token = localStorageService.get('token');
    var me = localStorageService.get('me');

    if (token)
        $http.defaults.headers.common['X-TrackerToken'] = token;

    var services = {};

    services.addToken = function (token, remember, cb) {
        $http.defaults.headers.common['X-TrackerToken'] = token;

        services.me(function (res) {
            if (res) {
                me = res;
                if (remember) {
                    localStorageService.set('token', token);
                    var user = {
                        email: res.email,
                        id: res.id,
                        initials: res.initials,
                        projects: res.projects
                    };
                    localStorageService.set('me', user);
                    return cb(true);
                }
            } else {
                return cb(false);
            }
        })
    };

    services.isSignedIn = function () {
        return localStorageService.get('token');
    };

    services.me = function (cb) {
        if (me == undefined) {
            $http.get(PIVOTAL + "me").then(function (res) {
                me = res.data;
                return cb(res.data);
            }, function () {
                return cb(false);
            });
        } else {
            cb(me);
            $http.get(PIVOTAL + "me").then(function (res) {
                me = res.data;
            });
        }
    };

    services.getProjects = function (cb) {
        $http.get(PIVOTAL + "projects").then(function (res) {
            return cb(res.data);
        }, function () {
            return cb(false);
        });
    };

    services.getTasks = function (projectId, cb) {
        $http.get(PIVOTAL + "projects/" + projectId + '/stories?filter=state:started owner:' + me.id).then(function (res) {
            return cb(res.data);
        }, function () {
            return cb(false);
        });
    };

    services.getTask = function (projectId, taskId, cb) {
        $http.get(PIVOTAL + "projects/" + projectId + '/stories/' + taskId).then(function (res) {
            return cb(res.data);
        }, function () {
            return cb(false);
        });
    };

    return services;
}]);