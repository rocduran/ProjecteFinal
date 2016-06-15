// server.js

// BASE
// =============================================================================

// Fem servir els paquets que necessitarem
var express = require('express'); // Truquem a Express
var app = express(); // Definim la nostra App fent servir Express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
//mongoose.connect('mongodb://rocduran.ddns.net:27017/'); // Conexió a la base de dades
mongoose.connect('mongodb://localhost:27017/'); // Conexió a la base de dades si no tinc internet

// Configurem l'app perque faci servir el bodyParser()
// Això permetra fer peticions POST
app.use(bodyParser());

var port = process.env.PORT || 3000; // Indiquem el port que farà servir l'app.

// Definim la carpeta per estàtics o "públics".

app.use(express.static(__dirname + '/public'));


// DEFINIM RUTES
// =============================================================================
var router = express.Router(); // Creem una instancia del Router de Express

// Controlador Todo
var todo_controller = require('./server/controllers/todo');

// Definim la ruta principal i què respondrà.
router.get('/', function(req, res) {
    res.send('Hola món!');
    console.log('Petició al servidor');
});

// Si reps una peticio a /api/todo realitza les següents accions:
router.route('/todo')

    .get(todo_controller.listTodo)
    .post(todo_controller.newTodo)
    .put(todo_controller.updateTodo);

// Si passen un parametre via GET despres de /todo, realitza les següents accions:
router.route('/todo/:id')

	.delete(todo_controller.deleteTodo);


// Indiquem a Express que treballarem amb / com a base (Podriem fer que totes les rutes que volguessim comencessin amb /api, per exemple)
app.use('/api', router);

// INICIEM EL SERVIDOR
// =============================================================================
app.listen(port);
console.log('Executant al port: ' + port);
