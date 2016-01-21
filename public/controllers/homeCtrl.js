angular.module('myApp').controller('homeCtrl', function($scope, authService) {

  authService.getCurrentUser().then(function(user) {
    console.log(user);
    $scope.user = user;
  });

});
