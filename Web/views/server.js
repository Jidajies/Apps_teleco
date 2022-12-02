// load the things we need
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

//parámetros base de datos 
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db');

var alert = require('alert');


//Debemos decirle a node - Donde estan nuestros archivos estáticos
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    
    res.render('pages/index', {
       
    });
});

// about page
app.get('/inscripcion', function(req, res) {
    res.render('pages/inscripcion');
});

// about index
app.get('/index', function(req, res) {
    res.render('pages/index');
});

// about encuesta
app.get('/encuesta', function(req, res) {
    res.render('pages/encuesta');
});

//recibir datos del formulario de inscripción
app.post('/enviar', function(req, res) {
    var variable = req.body;
    console.log(variable);
    //insertar en base de datos
    db.serialize(function() {
       
         // Insert data into the table
        db.run('INSERT INTO empleados(empleado,nombre,apellido,email,telefono,password) VALUES('+variable.numero+',"'+variable.fname+'","'+variable.lname+'","'+variable.email+'","'+variable.telefono+'","'+variable.contrasena+'")'),function(err,row){
            if(err){
                console.log(err.message)
            }
            console.log("entry added to table")
            
        }
        
        
       });
       

});

app.post('/entrar', function(req, res) {
    var variable2 = req.body;
    console.log(variable2);

    //buscar en base de datos usuario
   
       
         // Insert data into the table
    
            db.get('SELECT * FROM "empleados" WHERE empleado = '+variable2.num+' and password = '+variable2.pass+';', (err, row) => {
                if (err) {
                  return console.error(err.message);
                }
                return row
                  ? res.render('pages/principal')
                  : alert('No está inscrito no puede ingresar')
              });
    
       
    

});

app.listen(8080);
console.log('8080 is the magic port');

// en el navegador http://localhost:8080


