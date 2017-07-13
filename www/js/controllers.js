angular.module('starter.controllers', [])


.controller('HomeCtrl', function($scope, $state, $timeout) {
  $scope.item = function(){
    $state.go("tab.item");
  }

  $scope.items = [
    '../img/art1.jpeg',
    '../img/art2.jpg',
    '../img/art3.jpeg',
    '../img/art4.jpg',
    '../img/art5.jpg',
    '../img/art6.jpg',
    '../img/art7.jpg',
    '../img/banner1.jpeg',
    '../img/flower.jpg',
    '../img/perry.png'
  ]

  $scope.doRefresh = function() {
    $timeout( function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 3000);
  }
})

.controller('SearchCtrl', function($scope) {
  $scope.items = [
    '../img/art1.jpeg',
    '../img/art2.jpg',
    '../img/art3.jpeg',
    '../img/art4.jpg',
    '../img/art5.jpg',
    '../img/art6.jpg',
    '../img/art7.jpg',
    '../img/banner1.jpeg',
    '../img/flower.jpg',
    '../img/perry.png'
  ]
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
  $scope.items = [
    '../img/art1.jpeg',
    '../img/art2.jpg',
    '../img/art3.jpeg',
    '../img/art4.jpg',
    '../img/art5.jpg',
    '../img/art6.jpg',
    '../img/art7.jpg',
    '../img/banner1.jpeg',
    '../img/flower.jpg',
    '../img/perry.png'
  ]
})

.controller('ItemCtrl', function($scope, $state) {
  $scope.backButton = function(){
    $state.go("tab.profile");
  }
})
