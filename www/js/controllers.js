angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state) {
  $scope.item = function(){
    $state.go("tab.item");
  }
})
.controller('SearchCtrl', function($scope) {

})
.controller('LoginCtrl', function($scope) {

})
.controller('ProfileCtrl', function($scope, $state) {
  $scope.item = function(){
    $state.go("tab.item");
  }
})
.controller('ItemCtrl', function($scope, $state) {
  $scope.backButton = function(){
    $state.go("tab.profile");
  }
})
