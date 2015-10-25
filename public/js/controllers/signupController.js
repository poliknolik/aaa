angular.module('aaa')
.controller('SignUpCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

    $scope.rememberme = true;
    $scope.signup = function() {
        Auth.signup({
                companyName: $scope.user.companyName,
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                email: $scope.user.email,
                password: $scope.user.password,
                streetAddress: $scope.user.streetAddress,
                phoneExtension: $scope.user.phoneExtension,
                workPhone: $scope.user.workPhone,
                mobilePhone: $scope.user.mobilePhone
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