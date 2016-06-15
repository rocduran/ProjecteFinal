// server/controllers/todo.js

//Incluim el nostre model per a poder utilitzar-lo
var Todo = require('../models/todo'); // Nota: No fa falta especificar la extensió si es .js

// Escribim les funcions
module.exports = {

   newTodo: function(req, res, next) {
        if(!req.body.title) { // Validem que s'hagi ficat el títol del To-Do
            // Si no hi a títol, retornem un error 400
            res.json(400, {
                status: "ERR",
                message: "Has d'especificar un títol per el To-Do"
            });
        } else {
            // Si es correcte, li passem les dades al model perque les inserti a la BD.
            Todo.createTodo(req.body, function(err, response) {
                if(err) { // Si retorna un error, l'enviem al client.
                    res.json({
                        status: "ERR",
                        message: "Ha sorgit un error a la BD",
                        error: err
                    });
                } else { // Si no hi ha errors, enviem un missatge d'èxit al client.
                    res.json({
                        status: "OK",
                        message: "S'ha guardat amb èxit"
                    });
                }
            });
        }
    },
 	updateTodo: function(req, res, next) {
        if(!req.body.id) {
            res.json(400, {
                status: "ERR",
                message: "No s'ha especificat l'identificador del ToDo que es vol borrar"
            });
        } else if (!req.body.title) {
            res.json(400, {
                status: "ERR",
                message: "Has d'especificar un títol per el To-Do"
            });
        } else {
            // Si es correcte, li passem les dades al model perque les actualitzi a la BD.
            Todo.updateTodo(req.body.id, req.body, function(err, response) {
                if(err) { // Si retorna un error, l'enviem al client.
                    res.json({
                        status: "ERR",
                        message: "Ha sorgit un error a la BD",
                        error: err
                    });
                } else {  // Si no hi ha errors, enviem un missatge d'èxit al client.
                    res.json({
                        status: "OK",
                        message: "S'ha actualizat amb èxit"
                    });
                }
            });
        }
    },
    listTodo: function(req, res, next) {
        Todo.readTodo(function(err, response) {
            if(err) { // Si retorna un error, l'enviem al client.
                res.json({
                    status: "ERR",
                    message: "Ha sorgit un error a la BD",
                    error: err
                });
            } else { // Si no hi ha errors, enviem les dades al client.
                res.json({
                    status: "OK",
                    data: response
                });
            }
        });
    },
    deleteTodo: function(req, res, next) {
        if(!req.params.id) {
            res.json(400, {
                status: "ERR",
                message: "No s'ha especificat l'identificador del ToDo que es vol borrar"
            });
        } else {
            Todo.removeTodo(req.params.id, function(err, response) {
                if(err) { // Si retorna un error, l'enviem al client.
                    res.json({
                        status: "ERR",
                        message: "Ha sorgit un error a la BD",
                        error: err
                    });
                } else { // Si no hi ha errors, enviem un missatge d'èxit al client.
                    res.json({
                        status: "OK",
                        message: "S'ha eliminat amb èxit"
                    });
                }
            });
        }
    }

};
