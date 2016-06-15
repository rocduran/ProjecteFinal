// server/models/todo.js

// Fem un require de mongoose, que es el que ens ajuda a conectar amb MongoDB
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// Creem el Schema, que sería la estructura bàsica de cada document
var todoSchema = new Schema ({
    title: String,
    data: Date,
}, { versionKey: false });

// Compilem el Schema
var Todo = mongoose.model('Todo', todoSchema);

// Creem les accions per interactuar amb la base de dades
module.exports = {

createTodo: function(todo, callback) {
        var newTodo = new Todo(todo); // Creem un nou objecte que porta com a informació el parametre "todo" de la funció.

        // Aqui guardem a la base de dades el objecte.
        newTodo.save(function(err, response) {
            if(err) {
                callback(err, null); // Si hi ha un error, tornem el callback amb l'error.
            } else {
                callback(null, response); // Si no hi ha error, tornem el callback sense errors i amb la resposta a la base de dades.
            }
        });
    },

readTodo: function(callback) {
        // Fem una búsqueda sense paràmetres perque ens retorni tots els resultats de la colecció.
        Todo.find().exec(function(err, response) {
            if(err) {
                callback(err, null); //Si hi ha un error, tornem el callback amb l'error.
            } else {
                callback(null, response); // Si no hi ha error, tornem el callback sense errors i amb la resposta a la base de dades.
            }
        });
    },

updateTodo: function(id, todo, callback) {
        //Busquem per ID i actualitzem la informació amb el contingut al paràmetre "todo".
        Todo.findByIdAndUpdate(id, todo, function(err, response) {
            if(err) {
                callback(err, null); //Si hi ha un error, tornem el callback amb l'error.
            } else {
                callback(null, response); // Si no hi ha error, tornem el callback sense errors i amb la resposta a la base de dades.
            }
        });
    },

removeTodo: function(id, callback) {
        // Busquem per ID, i si el troba l'elimina.
        Todo.findByIdAndRemove(id, function(err, response) {
            if(err) {
                callback(err, null); // Si hi ha un error, tornem el callback amb l'error.
            } else {
                callback(null, response); // Si no hi ha error, tornem el callback sense errors i amb la resposta a la base de dades.
            }
        });
    }
};

