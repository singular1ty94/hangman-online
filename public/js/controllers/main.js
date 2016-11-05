angular.module('hangmanController', ['ngMaterial'])
  .controller('mainController', ['$scope', '$http', 'Hangman', '$mdDialog', function($scope, $http, Hangman, $mdDialog) {
    //By default, show the loading icon.
    $scope.loading = false;
    $scope.playing = false;

    /**
     * Get a Hangman game.
     */
    $scope.getGame = function(id){
      $scope.loading = true; //Load
      
      Hangman.get(id).success(function(data){
        $scope.loading = false;
        $scope.playing = true;
        $scope.hangman = data;
      });
    };

    $scope.popupJoin = function(){
        // Appending dialog to document.body to cover sidenav in docs app
        var prompt = $mdDialog.prompt()
          .title('Join a Game')
          .placeholder('Enter the Game ID')
          .ok('Next')
          .cancel('Cancel');

        $mdDialog.show(prompt).then(function(result) {
            var id = result;
            var namePrompt = $mdDialog.prompt()
                .title('Enter your Name')
                .placeholder('Enter your Name')
                .ok('Play!')
                .cancel('Cancel');

              $mdDialog.show(namePrompt).then(function(result) {
                  var name = result;
                  $scope.loading = true;

                  Hangman.join({'player': name, 'id': id})
                    .success(function(data) {
                      //Remove the words from the input and refresh the list.
                      $scope.loading = false;
                      $scope.playing = true;
                      $scope.hangman = data;
                    });
              }, function() {
                //Can't reach here
              });
        }, function() {
          //Decided not to play
        });
    };

    $scope.popupGame = function(){
        // Appending dialog to document.body to cover sidenav in docs app
        var prompt = $mdDialog.prompt()
          .title('Make a new Game')
          .placeholder('Enter your word')
          .ok('Next')
          .cancel('Cancel');

        $mdDialog.show(prompt).then(function(result) {
            var word = result;
            var namePrompt = $mdDialog.prompt()
                .title('Enter your Name')
                .placeholder('Enter your Name')
                .ok('Play!')
                .cancel('Cancel');

              $mdDialog.show(namePrompt).then(function(result) {
                  var name = result;
                  $scope.loading = true;

                  Hangman.create({'host': name, 'word': word})
                    .success(function(data) {
                      //Remove the words from the input and refresh the list.
                      $scope.loading = false;
                      $scope.playing = true;
                      $scope.hangman = data;
                    });
              }, function() {
                //Can't reach here
              });
        }, function() {
          //Decided not to play
        });
    };


    /**
    * Send a delete request to the server.
    
    $scope.deleteGame = function(id) {
      $scope.loading = true;

      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .title('Really delete?')
            .textContent('Are you sure you want to remove this ToDo note?')
            .ariaLabel('Cofirm deletion')
            .ok('Delete')
            .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        //Actually delete the ToDo
        Todos.delete(id)
          .success(function(data) {
            $scope.loading = false;
            $scope.todos = data;
          });
      }, function() {
        //Do nothing.
          $scope.loading = false;
      });
    };*/
  }]);
