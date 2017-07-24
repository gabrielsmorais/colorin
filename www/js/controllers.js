angular.module('starter.controllers', [])

.directive('ngEnter', function() {
       return function(scope, element, attrs) {
           element.bind("keydown keypress", function(event) {
               if(event.which === 13) {
                       scope.$apply(function(){
                               scope.$eval(attrs.ngEnter);
                       });

                       event.preventDefault();
               }
           });
       };
})

.controller('HomeCtrl', function($scope, $http, $state, $timeout) {
    $http.get('http://104.131.166.166:3000/home').then(function(resposta){
    $scope.items = resposta.data;
 })

  $scope.backButton = function(){
    $state.go("tab.profile");
  }


  // var bgColorArray = ['#FF94A1','#FFF589','#BEC4F2'],
  //   selectBG = bgColorArray[Math.floor(Math.random() * bgColorArray.length)];
  //
  //   [].forEach.call(document.getElementsByTagName('itemHomeInfo'), function(el) {
  //     el.style.backgroundColor = selectBG;
  // });

  $scope.doRefresh = function() {
    $timeout( function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 3000);
  }
})

.controller('SearchCtrl', function($scope, $http, $state, $timeout) {
 $scope.search = {};

 $http.get('http://104.131.166.166:3000/home').then(function(resposta){
   $scope.items = resposta.data;
 });

 $scope.buscar = function(){
   if($scope.search.query != null){
     $http.get('http://104.131.166.166:3000/search/'+$scope.search.query).then(function(resposta){
     $scope.items = resposta.data;
     });
   }
   else{
     $http.get('http://104.131.166.166:3000/home').then(function(resposta){
       $scope.items = resposta.data;
     });
   }
 };

 $scope.doRefresh = function() {
   $timeout( function() {
     $scope.$broadcast('scroll.refreshComplete');
   }, 3000);
 }
})

.controller('LoginCtrl', function($scope, $state, $http, Sessao) {
  $scope.data = {};

  $scope.logar = function() {

    $http.post('http://104.131.166.166:3000/login', $scope.data).then(function(resposta){
      if(!resposta.data){
        alert('Login invalido' );
        return;
      }
      Sessao.inicializar(resposta.data);

      $state.go("tab.profile", {username: resposta.data.username});
    })

  };

  $scope.registrar = function() {
    $state.go("tab.registerp1");
  }
})

.controller('Registerp1Ctrl', function($scope, $state, $http, Sessao) {
    $scope.data = {};

    $scope.register = function(){
        $http.post('http://104.131.166.166:3000/registerp1', $scope.data).then(function(resposta){
          Sessao.inicializar(resposta.data);
          $state.go('tab.profile', {username: resposta.data.username});
        })
      }
})

.controller('Registerp2Ctrl', function($scope, $state, $http, Sessao) {
   $scope.data = {};
   var usuario = Sessao.obter();

   $scope.registerart = function(){
       $http.post('http://104.131.166.166:3000/'+usuario.username+'/registerp2', $scope.data).then(function(resposta){
         $state.go('tab.item', {artName: resposta.data.artName});
       })
     }
})

.controller('ProfileCtrl', function($scope, $state, $stateParams, $http, Sessao) {
 var usuario = Sessao.obter();
 $scope.item = function(){
   $state.go("tab.item");
 }

 $scope.newpost = function(){
  $state.go('tab.registerp2');
}

 $http.get('http://104.131.166.166:3000/profile/'+$stateParams.username +'/list').then(function(resposta){
   $scope.data = resposta.data[0];
 });

 $http.get('http://104.131.166.166:3000/profile/'+$stateParams.username).then(function(resposta2){
   $scope.items = resposta2.data;
 })
})

.controller('ItemCtrl', function($scope, $state, $stateParams, $http, Sessao) {
  $scope.usuario = Sessao.obter();

  $http.get('http://104.131.166.166:3000/profile/'+ $scope.usuario.username).then(function(resposta){
    $scope.data = resposta.data[0];
  });

  $scope.backButton = function(){
    $state.go("tab.profile");
  }
})
