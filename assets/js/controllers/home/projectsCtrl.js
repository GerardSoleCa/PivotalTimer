/**
 * Created by gerard on 10/30/15.
 */
var app = angular.module('pivotalTimer');
app.controller('projectsCtrl', ['$scope', '$state', '$stateParams', 'Pivotal', function ($scope, $state, $stateParams, Pivotal) {
    $scope.active = $stateParams.projectId;
    console.log($scope.active);
    Pivotal.me(function (cb) {
        $scope.name = cb.name;
        $scope.email = cb.email;
        $scope.projects = cb.projects;
    });

    $scope.setActive = function (element) {
        $scope.active = element;
    }
}]);

app.controller('tasksCtrl', ['$scope', '$stateParams', 'Pivotal', function ($scope, $stateParams, Pivotal) {
    var projectId = $stateParams.projectId;
    Pivotal.getTasks(projectId, function (tasks) {
        console.log(tasks);
        $scope.tasks = tasks;
    });

    $scope.setActive = function (element) {
        $scope.active = element;
    }
}]);

app.controller('taskCtrl', ['$scope', '$stateParams', 'Pivotal', 'Timing', function ($scope, $stateParams, Pivotal, Timing) {
    var projectId = $stateParams.projectId;
    var taskId = $stateParams.taskId;
    Pivotal.getTask(projectId, taskId, function (task) {
        $scope.task = task;
        $scope.task.isRunning = Timing.isRunning(task.id);
    });
    $scope.start = function (task) {
        Timing.start(task.id);
        $scope.task.isRunning = Timing.isRunning(task.id);
    };
    $scope.stop = function (task) {
        Timing.stop(task.id);
        $scope.task.isRunning = Timing.isRunning(task.id);
    };
}]);