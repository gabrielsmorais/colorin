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
})

.factory('SenseService', function() {
  var listaSenses = [
      {colorName: "sensePurple", colorClass: "col colPurple", squareClass: "square squarePurple"},
      {colorName: "senseRed", colorClass: "col colRed", squareClass: "square squareRed"},
      {colorName: "senseOrange",colorClass: "col colOrange", squareClass: "square squareOrange"},
      {colorName: "senseYellow", colorClass: "col colYellow", squareClass: "square squareYellow"},
      {colorName: "senseGreen", colorClass: "col colGreen", squareClass: "square squareGreen"},
      {colorName: "senseBlue", colorClass: "col colBlue", squareClass: "square squareBlue"},
      {colorName: "senseWhite", colorClass: "col colWhite", squareClass: "square squareWhite"}
    ];
  return {
    todos: function() {
        return listaSenses;
    }
  };
});
