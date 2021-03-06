angular.module('starter.controllers', [])

.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}])

.directive('back', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }])

.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $rootScope.$on('$stateChangeStart', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})

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

.controller('HomeCtrl', function($scope, $http, $state, $timeout, Sessao, $stateParams, SenseService) {

$scope.randomColor = function(){
  // for (var i = 0; i < $scope.items.length; i++) {
    selectBG = Math.floor(Math.random() * 6);
    switch (selectBG) {
      case 0:
        $scope.myDynamicClass = 'itemHomeInfoPurple';
        $scope.myDynamicClass2 = 'itemHomePurple';
        break;
      case 1:
        $scope.myDynamicClass = 'itemHomeInfoRed';
        $scope.myDynamicClass2 = 'itemHomeRed';
        break;
      case 2:
        $scope.myDynamicClass = 'itemHomeInfoOrange';
        $scope.myDynamicClass2 = 'itemHomeOrange';
        break;
      case 3:
        $scope.myDynamicClass = 'itemHomeInfoYellow';
        $scope.myDynamicClass2 = 'itemHomeYellow';
        break;
        case 4:
        $scope.myDynamicClass = 'itemHomeInfoGreen';
        $scope.myDynamicClass2 = 'itemHomeGreen';
        break;
      case 5:
        $scope.myDynamicClass = 'itemHomeInfoBlue';
        $scope.myDynamicClass2 = 'itemHomeBlue';
        break;
      default:
        break;
    }
  }
// }
window.onpageshow = $scope.randomColor();

  $scope.goProfile = function(data){
    $state.go('tab.profile', {username: data.username});
  }

  $scope.senses = SenseService.todos();

  var usuario = Sessao.obter();

    $http.get('http://104.131.166.166:3000/home').then(function(resposta){
    $scope.items = resposta.data;


 })

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
     var usuario = Sessao.obter();
       $http.get('http://104.131.166.166:3000/home').then(function(resposta){
       $scope.items = resposta.data;
    })
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
     var usuario = Sessao.obter();
       $http.get('http://104.131.166.166:3000/home').then(function(resposta){
       $scope.items = resposta.data;
    })
   });
 }

 $scope.viewInsert = function(item){
   var usuario = Sessao.obter();
   $scope.viewInserted = {}
   $scope.viewInserted.artName = item;
   $scope.viewInserted.username = usuario.username;

   $http.put('http://104.131.166.166:3000/item/'+$scope.viewInserted.artName+'/view', $scope.viewInserted).then(function(response){
     if(response.viewInserted){
       console.log('Put executado com sucesso');
     }
     console.log('erro');
    });
  }
  $scope.goItem = function(item){
    $state.go('tab.item', {artName: item.artName});
  }

  $scope.doRefresh = function() {
    $timeout( function() {
      $scope.$broadcast('scroll.refreshComplete');
      $http.get('http://104.131.166.166:3000/home').then(function(resposta){
         $scope.items = resposta.data;
      })
    }, 3000);
  }
})

.controller('SearchCtrl', function($scope, $http, $state, $timeout) {
 $scope.search = {};

 $scope.randomColor = function(){
   // for (var i = 0; i < $scope.items.length; i++) {
     selectBG = Math.floor(Math.random() * 6);
     switch (selectBG) {
       case 0:
         $scope.myDynamicClass2 = 'rowSearchItemPurple';
         break;
       case 1:
         $scope.myDynamicClass2 = 'rowSearchItemRed';
         break;
       case 2:
         $scope.myDynamicClass2 = 'rowSearchItemOrange';
         break;
       case 3:
         $scope.myDynamicClass2 = 'rowSearchItemYellow';
         break;
         case 4:
         $scope.myDynamicClass2 = 'rowSearchItemGreen';
         break;
       case 5:
         $scope.myDynamicClass2 = 'rowSearchItemBlue';
         break;
       default:
         break;
     }
   }
   window.onload = $scope.randomColor();


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

 $scope.viewInsert = function(item){
   var usuario = Sessao.obter();
   $scope.viewInserted = {}
   $scope.viewInserted.artName = item;
   $scope.viewInserted.username = usuario.username;

   $http.put('http://104.131.166.166:3000/item/'+$scope.viewInserted.artName+'/view', $scope.viewInserted).then(function(response){
     if(response.viewInserted){
       console.log('Put executado com sucesso');
     }
     console.log('erro');
    });
  }

 $scope.goItem = function(item){
   $state.go('tab.item', {artName: item.artName});
 }
 $scope.doRefresh = function() {
   $timeout( function() {
     $scope.$broadcast('scroll.refreshComplete');
   }, 3000);
 }
})

.controller('TutorialCtrl', function($scope, $state, $http, Sessao) {
  $scope.swiper = {};

      $scope.onReadySwiper = function (swiper) {

          swiper.on('slideChangeStart', function () {
              console.log('slide start');
          });

          swiper.on('onSlideChangeEnd', function () {
              console.log('slide end');
          });
      };
      $scope.goLogin = function(){
        $state.go('tab.login');
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

      // document.getElementsByClassName('.tab-nav.tabs').className = '.tab-nav.tabs.show';


      $state.go("tab.profile", {username: resposta.data.username});
    })

  };

  $scope.registrar = function() {
    $state.go("tab.registerp1");
  }
})

.controller('SettingsCtrl', function($scope, $state, $http, Sessao) {
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
  $scope.mostrarProfile = false;
  var usuario = Sessao.obter();
  if (usuario) {
    $scope.mostrarProfile = true;
  }
  console.log(usuario);
  $scope.newpost = function(){
   $state.go('tab.registerp2');
 }
})


.controller('Registerp1Ctrl', function($scope, $state, $http, Sessao) {

  $scope.enviarBanner = function(){
   var formData = new FormData();

   var arquivo = document.getElementById("artImg").files[0];
   formData.append("artImg", arquivo);
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
         var div = document.getElementById('mensagem');
       var resposta = xhr.responseText;
       div.innerHTML += resposta.message;
       //console.log('phiyvguohjb');
       }
     }
     //console.log('phiyvguohjb');
     xhr.open("POST", "http://104.131.166.166:3000/api/upload");
     xhr.send(formData);
   }

    $scope.data = {};

    $scope.register = function(){
        $http.post('http://104.131.166.166:3000/registerp1', $scope.data).then(function(resposta){
          Sessao.inicializar(resposta.data);
          $state.go('tab.profile', {username: resposta.data.username});
        })
      }
})

.controller('Registerp2Ctrl', function($scope, $state, $http, Sessao) {

  $scope.enviarImg = function(){
   var formData = new FormData();

   var arquivo = document.getElementById("artImg").files[0];
   formData.append("artImg", arquivo);
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
         var div = document.getElementById('mensagem');
       var resposta = xhr.responseText;
       div.innerHTML += resposta.message;
       //console.log('phiyvguohjb');
       }
     }
     //console.log('phiyvguohjb');
     xhr.open("POST", "http://104.131.166.166:3000/api/upload");
     xhr.send(formData);
   }

   $scope.data = {};
   var usuario = Sessao.obter();

   $scope.registerart = function(){
       $http.post('http://104.131.166.166:3000/'+usuario.username+'/registerp2', $scope.data).then(function(resposta){
         $state.go('tab.item', {artName: resposta.data.artName});
       })

     }
})

.controller('ProfileCtrl', function($scope, $state, $stateParams, $http, Sessao) {


   $scope.randomColor = function(){
     // for (var i = 0; i < $scope.items.length; i++) {
       selectBG = Math.floor(Math.random() * 6);
       switch (selectBG) {
         case 0:
           $scope.myDynamicClass2 = 'rowSearchItemPurple';
           break;
         case 1:
           $scope.myDynamicClass2 = 'rowSearchItemRed';
           break;
         case 2:
           $scope.myDynamicClass2 = 'rowSearchItemOrange';
           break;
         case 3:
           $scope.myDynamicClass2 = 'rowSearchItemYellow';
           break;
           case 4:
           $scope.myDynamicClass2 = 'rowSearchItemGreen';
           break;
         case 5:
           $scope.myDynamicClass2 = 'rowSearchItemBlue';
           break;
         default:
           break;
       }
     }

     window.onpageshow = $scope.randomColor();


 var usuario = Sessao.obter();

 $scope.viewInsert = function(item){
   var usuario = Sessao.obter();
   $scope.viewInserted = {}
   $scope.viewInserted.artName = item;
   $scope.viewInserted.username = usuario.username;

   $http.put('http://104.131.166.166:3000/item/'+$scope.viewInserted.artName+'/view', $scope.viewInserted).then(function(response){
     if(response.viewInserted){
       console.log('Put executado com sucesso');
     }
     console.log('erro');
    });
  }

 $scope.goItem = function(item){
   $state.go('tab.item', {artName: item.artName});
}

 $scope.newpost = function(){
  $state.go('tab.registerp2');
}

 $http.get('http://104.131.166.166:3000/profile/'+$stateParams.username +'/list').then(function(resposta){
   $scope.data = resposta.data[0];
 });

 $http.get('http://104.131.166.166:3000/profile/'+$stateParams.username).then(function(resposta2){
   $scope.items = resposta2.data;

    $scope.totalCollabs = 0;
    for(item in $scope.items){
      for(colla in $scope.items[item].collab){
        $scope.totalCollabs = $scope.totalCollabs + 1;
        }
    }

    $scope.totalSenses = 0;
    for(item in $scope.items){
      for(sens in $scope.items[item].sense){
        $scope.totalSenses = $scope.totalSenses + 1;
        }
    }
  })

})

.controller('ItemCtrl', function($scope, $state, $stateParams, $http, Sessao, SenseService) {
$scope.senses = SenseService.todos();

$scope.randomColor = function(){
  // for (var i = 0; i < $scope.items.length; i++) {
    selectBG = Math.floor(Math.random() * 6);
    switch (selectBG) {
      case 0:
        $scope.myDynamicClass = 'itemHomeInfoPurple';
        $scope.myDynamicClass2 = 'itemHomePurple';
        break;
      case 1:
        $scope.myDynamicClass = 'itemHomeInfoRed';
        $scope.myDynamicClass2 = 'itemHomeRed';
        break;
      case 2:
        $scope.myDynamicClass = 'itemHomeInfoOrange';
        $scope.myDynamicClass2 = 'itemHomeOrange';
        break;
      case 3:
        $scope.myDynamicClass = 'itemHomeInfoYellow';
        $scope.myDynamicClass2 = 'itemHomeYellow';
        break;
        case 4:
        $scope.myDynamicClass = 'itemHomeInfoGreen';
        $scope.myDynamicClass2 = 'itemHomeGreen';
        break;
      case 5:
        $scope.myDynamicClass = 'itemHomeInfoBlue';
        $scope.myDynamicClass2 = 'itemHomeBlue';
        break;
      default:
        break;
    }
  }
// }
window.onpageshow = $scope.randomColor();

$scope.goProfile = function(data){
  $state.go('tab.profile', {username: data.username});
}

 $http.get('http://104.131.166.166:3000/item/'+ $stateParams.artName).then(function(resposta){
   $scope.item = resposta.data[0];
 });

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
   res.redirect('back');
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

$scope.backButton = function(){
  $state.go("tab.profile");
}
})
