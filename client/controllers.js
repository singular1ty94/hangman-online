angular.module('myApp').controller('homeController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.user = AuthService.getUser();
}]);

angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function (data) {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

angular.module('myApp').controller('createGameController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.createGame = function () {

      //Initial values
      $scope.error = false;
      $scope.disabled = true;

      // call create game from service
      AuthService.createGame($scope.createForm.word)
        // handle success
        .then(function(data) {
          $location.path("/play/" + data.gameId);
          $scope.disabled = false;
          $scope.createForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "We couldn't create your game!";
          $scope.disabled = false;
          $scope.createForm = {};
        });

    };

}]);

angular.module('myApp').controller('playGameController',
  ['$scope', '$location', '$routeParams', 'AuthService',
  function ($scope, $location, $routeParams, AuthService) {

    //Initial values.
    $scope.game = null;
    $scope.word = null;

    AuthService.fetchGame($routeParams.gameId)
      //Handle success
      .then(function(data){
          //Get the game's word.
          $scope.game = data.game;
          $scope.word = data.game.word;
      })
      //Handle error
      .catch(function(){
        $location.path("/");
      });

}]);
