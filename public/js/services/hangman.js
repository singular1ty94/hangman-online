angular.module('hangmanService', [])
  .factory('Hangman', ['$http', function($http) {
    return {
      get: function(id) {
        return $http.get('/api/hangman/' + id);
      },
      create: function(hangmanData) {
        return $http.post('/api/hangman', hangmanData);
      },
      join: function(hangmanData) {
        return $http.post('/api/hangman/join', hangmanData);
      },
      delete: function(id) {
        return $http.delete('/api/hangman/' + id);
      }
    }
  }]);
