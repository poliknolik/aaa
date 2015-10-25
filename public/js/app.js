angular.module('aaa', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies'])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;

    $routeProvider
        .when('/', {
            templateUrl: '/partials/home.ejs',
            access: accessLevels.public
        })
        .when('/login', {
            templateUrl: '/partials/login.ejs',
            controller: 'LoginCtrl',
            access: accessLevels.anon
        })
        .when('/signup', {
            templateUrl: '/partials/signup.ejs',
            controller: 'SignUpCtrl',
            access: accessLevels.anon
        })
        .when('/profile', {
            templateUrl: '/partials/profile.ejs',
            access: accessLevels.user
        })
        .when('/logout', {
            resolve: {
                logout: ['$q', '$location', 'Auth', function($q, $location, Auth){
                    var deferred = $q.defer();
                    Auth.logout(function (data, status, headers, config) {
                        deferred.resolve();
                        $location.path('/');
                    });
                    
                    return deferred.promise;
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });

    if(window.history && window.history.pushState){
        $locationProvider.html5Mode(true);
      }

    $httpProvider.responseInterceptors.push(function($q, $location) { 
        return function(promise) { 
            return promise.then( 
                // Success: just return the response 
                function(response){ 
                    return response; 
                }, 
                // Error: check the error status to get only the 401 or the 403
                function(response) {
                    if (response.status === 401 || response.status === 403)
                        $rootScope.redirectToUrlAfterLoginUrl = $location.url();

                        $location.path('/login'); 
                    return $q.reject(response);
                } 
            );
        }
    });
}])

.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

    $rootScope.redirectToUrlAfterLoginUrl = '/';

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!Auth.authorize(next.access)) {
            if(Auth.isLoggedIn()){
                // user does not have permissions to page,
                // so redirect request to the home page
                $location.path('/');
            }
            else{
                // setup redirect page
                $rootScope.redirectToUrlAfterLoginUrl = $location.url();

                $location.path('/login');
            }
        }
    });

}]);