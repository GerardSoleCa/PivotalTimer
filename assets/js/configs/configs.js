/**
 * Created by gerard on 10/30/15.
 */
var app = angular.module('pivotalTimer');
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'assets/tpls/index.html',
            controller: 'signinCtrl'
        })
        .state('projects', {
            url: '/projects',
            views: {
                "": {
                    templateUrl: 'assets/tpls/home.html',
                },
                "projects@projects": {
                    templateUrl: "assets/tpls/home/projects.html",
                    controller: 'projectsCtrl'
                }
            },
            authenticate: true
        })
        .state('projects.tasks', {
            url: '/:projectId',
            views: {
                "tasks@projects": {
                    templateUrl: "assets/tpls/home/tasks.html",
                    controller: 'tasksCtrl'
                }
            },
            authenticate: true
        })

        .state('projects.tasks.detail', {
            url: '/task/:taskId',
            views: {
                "detail@projects": {
                    templateUrl: "assets/tpls/home/task.html",
                    controller: 'taskCtrl'
                }
            },
            authenticate: true
        })
}]);

app.run(function ($rootScope, $location, Pivotal, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && !Pivotal.isSignedIn()) {
            $state.transitionTo("login");
            event.preventDefault();
        }
    });
});