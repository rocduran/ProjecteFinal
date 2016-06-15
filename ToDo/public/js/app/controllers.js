// public/js/app/controllers.js

/* Controllers */

var patroDate = "yyyy-MM-dd HH:mm:ss.SSS";

angular.module('ToDoList.controllers', [])
    .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.newTodo = function() {
            // Fem un POST a la API per afegir un nou ToDO
            $scope.nTodo.data = new Date();
            var tittle = $scope.nTodo.title;
            //console.log("Enviant todo al servidor: " + $scope.nTodo.title);
            $http.post("/api/todo", $scope.nTodo).success(function(response) {
                if(response.status === "OK") { // Si retorna un OK la API...
                    //console.log("Resposta OK del todo pel servidor " + tittle);

                    if (tittle =="xxx") {
                        var now = new Date();
                        var ms = now.getMilliseconds();
                        console.log("Fi funcio: " + now + "." + ms);
                    }
                    $scope.nTodo = {}; // Netegem el scope
                     // Actualitzem la llista de ToDo's
                }
            });
        };

        $scope.deleteTodo = function(id) {
            // Fem una petició DELETE a la API per borrar el id que passi el html com a paràmetre
            $http.delete("/api/todo/" + id).success(function(response) {
                if(response.status === "OK") { // Si la API retorna un OK...
                    getTodos(); // Actualitzem la llista de ToDo's
                }
            });
        };

        $scope.updateTodo = function(todo) {
            todo.id = todo._id; // Passem la _id a id per major comoditat del costat del servidor al tractar les dades.
            delete todo._id; // El borrem per evitar modificar el id a la BD
            todo.data = new Date();
            // Fem una petició PUT per fer el update a un document de la base de dades.
            $http.put("/api/todo", todo).success(function(response) {
                if(response.status === "OK") {
                    getTodos(); // Actualitzem la lista de ToDo's
                }
            });
        };

        // Creem una funció per obtenir les dades de la base de dades y actualitzar-los cada cop que sigui necessari.
        var getTodos = function() {
            $http.get("/api/todo").success(function(response) {
                if(response.status == "OK") {
                    $scope.todos = response.data;
                }
            });
        };

        //getTodos(); // Obtenim la llista de ToDo al cargar la pàgina

        //STRESS TESTING
        var inici = new Date();
        var ms = inici.getMilliseconds();
        console.log("Inici funcio: " + inici + "." + ms);
        //var max = 10000;
        var max = 1;
        for (var i = 0; i < max; i++) {

            $scope.nTodo = {};
             $scope.nTodo.title = "Rendiment: "+ i;
             if (i == max - 1)  $scope.nTodo.title = "xxx";
              $scope.nTodo.data = new Date();
              $scope.newTodo();
        }
        //getTodos();

    }]);
