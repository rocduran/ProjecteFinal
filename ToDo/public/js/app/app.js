// public/js/app/app.js

// Declarem l'App, així com les seves dependències.
var app = angular.module('ToDoList', [
  'ToDoList.controllers'
]);

// Filtre Angular per deixar amb majúscula la primera lletra del to-do
app.filter('capitalize', function(){
  return function(input, char){
    if(isNaN(input)){
      char = char - 1 || 0;
      var letter = input.charAt(char).toUpperCase();
      var out = [];
      for(var i = 0; i < input.length; i++){
        if(i == char){
          out.push(letter);
        } else {
          out.push(input[i]);
        }
      }
      return out.join('');
    } else {
      return input;
    }
  };
});



// Per mostrar un tooltip al estar parat sobre un to-do
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});