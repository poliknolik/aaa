angular.module('aaa')
.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
                email: $scope.user.email,
                password: $scope.user.password,
                rememberme: $scope.rememberme 
            },
            function(res) {
                $location.path($rootScope.redirectToUrlAfterLoginUrl);
                $rootScope.redirectToUrlAfterLoginUrl = '/';
            },
            function(err) {
                $rootScope.error = "Failed to login";
            });
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
}]);