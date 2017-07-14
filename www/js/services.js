angular.module('starter.services', [])

.factory('Sessao', function() {
  var usuario;

  return {
    inicializar: function(dados){
      usuario = dados;
    },
    obter: function(){
      return usuario;
    }
  }
});
