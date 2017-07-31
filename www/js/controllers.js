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

.controller('HomeCtrl', function($scope, $http, $state, $timeout, Sessao, SenseService) {
  $scope.item = {};
  $scope.senses = SenseService.todos();

  $http.get('http://104.131.166.166:3000/home').then(function(resposta){
    $scope.items = resposta.data;
 })

  $scope.backButton = function(){
    $state.go("tab.profile");
  }

  $scope.senseInsert = function(item, sense){
    var usuario = Sessao.obter();
    $scope.senseInserted = {}
    $scope.senseInserted.artName = item;
    $scope.senseInserted.senseColor = sense;
    $scope.senseInserted.username = usuario.username;

    $http.put('http://104.131.166.166:3000/item/'+$scope.senseInserted.artName+'/sense', $scope.senseInserted).then(function(response){
      if(response.senseInserted){
        console.log('Put executado com sucesso');
      }
      console.log('erro');
    });
  }

  $scope.collabInsert = function(item, collabText){
    var usuario = Sessao.obter();
    $scope.collabInserted = {}
    $scope.collabInserted.artName = item;
    $scope.collabInserted.collabText = collabText;
    $scope.collabInserted.username = usuario.username;

    $http.put('http://104.131.166.166:3000/item/'+$scope.collabInserted.artName+'/collab', $scope.collabInserted).then(function(response){
      if(response.collabInserted){
        console.log('Put executado com sucesso');
      }
      console.log('erro');
    });
  }

  $scope.viewInsert = function(item){
    var usuario = Sessao.obter();
    $scope.viewInserted = {}
    $scope.viewInserted.artName = item.artName;
    $scope.viewInserted.username = $scope.usuario.username;

    $http.put('http://104.131.166.166:3000/'+$scope.viewInserted.artName+'/view', $scope.viewInserted).then(function(response){
      if(response.viewInserted){
        console.log('Put executado com sucesso');
      }
      console.log('erro');
    });
  }

  $scope.irparaitem = function(item){
    $state.go('tab.item', {artName: item.artName});
  }

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
 $scope.usuarioAtivo = Sessao.obter();

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

  $http.get('http://104.131.166.166:3000/item/'+ $stateParams.artName).then(function(resposta){
    $scope.item = resposta.data[0];
  });

  $scope.backButton = function(){
    $state.go("tab.profile");
  }
})
