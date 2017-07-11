angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state) {
  $scope.item = function(){
    $state.go("tab.item");
  }
})
.controller('SearchCtrl', function($scope) {

})
.controller('LoginCtrl', function($scope, $state) {
  $scope.logar = function() {
    $state.go("tab.profile");
  };

  $scope.registrar = function() {
    $state.go("tab.registerp1");
  }
})

.controller('Registerp1Ctrl', function($scope, $state) {
  $scope.registrarp1 = function() {
    $state.go("tab.registerp2");
}
})

.controller('Registerp2Ctrl', function($scope, $state) {
  $scope.registrarp2 = function() {
    $state.go("tab.profile");
}
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
