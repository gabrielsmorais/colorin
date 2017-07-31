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
<<<<<<< HEAD
    var listaSenses = [
      {colorName: "sensePurple", colorClass: "col colPurple", squareClass: "square squarePurple"},
      {colorName: "senseRed", colorClass: "col colRed", squareClass: "square squareRed"},
      {colorName: "senseOrange",colorClass: "col colOrange", squareClass: "square squareOrange"},
      {colorName: "senseYellow", colorClass: "col colYellow", squareClass: "square squareYellow"},
      {colorName: "senseGreen", colorClass: "col colGreen", squareClass: "square squareGreen"},
      {colorName: "senseOrange", colorBlue: "col colBlue", squareClass: "square squareBlue"},
      {colorName: "senseWhite", colorClass: "col colWhite", squareClass: "square squareWhite"}
    ];
    return {
    todos: function() {
        return listaSenses;
    }
  };
=======
   var listaSenses = [
     {colorName: "sensePurple", colorClass: "col colPurple", squareClass: "square squarePurple"},
     {colorName: "senseRed", colorClass: "col colRed", squareClass: "square squareRed"},
     {colorName: "senseOrange",colorClass: "col colOrange", squareClass: "square squareOrange"},
     {colorName: "senseYellow", colorClass: "col colYellow", squareClass: "square squareYellow"},
     {colorName: "senseGreen", colorClass: "col colGreen", squareClass: "square squareGreen"},
     {colorName: "senseOrange", colorBlue: "col colBlue", squareClass: "square squareBlue"},
     {colorName: "senseWhite", colorClass: "col colWhite", squareClass: "square squareWhite"}
   ];
   return {
   todos: function() {
       return listaSenses;
   }
 };
>>>>>>> a13621e81479260abc68a08cfc4a1e310844e8cf
});
