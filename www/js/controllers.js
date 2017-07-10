angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {

})
.controller('SearchCtrl', function($scope) {

})
.controller('LoginCtrl', function($scope) {

})
.controller('ProfileCtrl', function($scope, $state) {
  $scope.item = function(){
    $state.go("item");
  }
})
.controller('ItemCtrl', function($scope) {
})
