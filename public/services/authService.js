angular.module('myApp').service('authService', function($http, $state) {

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/current'
    }).then(function(response){
      return response.data;
    }).catch(function(err) {
      if(err.status === 401) {
        $state.go('Login');
      }
    });
  };
});
