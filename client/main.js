var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/create', {
      templateUrl: 'partials/create.html',
      controller: 'createGameController',
      access: {restricted: true}
    })
    .when('/play/:gameId', {
      templateUrl: 'partials/play.html',
      controller: 'playGameController',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});

/**
 * Controls the routing in the application.
 */
myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){ //If we're not logged in and this page is restricted, make us login.
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
