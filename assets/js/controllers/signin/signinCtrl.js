/**
 * Created by gerard on 10/30/15.
 */
var app = angular.module('pivotalTimer');
app.controller('signinCtrl', ['$scope', 'Pivotal', '$state', function ($scope, Pivotal, $state) {
    var isSignedIn = Pivotal.isSignedIn();
    if (isSignedIn) {
        $state.go('projects');
    }
    $scope.signIn = function () {
        var token = $scope.token;
        var remember = $scope.rememberMe;
        Pivotal.addToken(token, remember, function (res) {
            if (res) {
                $state.go('projects');
            } else {
                $scope.error = "Token could not be verified";
            }
        });
    };
}]);

