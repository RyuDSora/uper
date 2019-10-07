/////////////////////////////////////////
//Servidor web en nodeJS para publicar archivos estaticos.
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Exponer una carpeta como publica, unicamente para archivos estaticos: .html, imagenes, .css, .js
app.use(express.static("public"));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

//Verificar si existe una variable de sesion para poner publica la carpeta home
var home = express.static("home");
app.use(
    function(peticion,respuesta,next){
        if (peticion.session.usuario){
            //Significa que el usuario si esta logueado
            home(peticion,respuesta,next);
        }
        else
            return next();
    }
);

///Para agregar seguridad a una ruta especifica:
function verificarAutenticacion(peticion, respuesta, next){
	if(peticion.session.usuario)
		return next();
	else
		respuesta.send("ERROR, ACCESO NO AUTORIZADO");
}

app.post("/login", function(peticion, respuesta){
    var usuarios = [
        { user: "usuario1", password: "asd123" },
        { user: "usuario2", password: "asd123" }
    ];

    const result = usuarios.filter(e => e.user == peticion.body.usuario && e.password == peticion.body.contrasena);
    if (result.length) {
        peticion.session.usuario = peticion.body.usuario;
        respuesta.send({ estatus: 0, mensaje: "Bienvenido" });
    } else {
        respuesta.send({ estatus: 1, mensaje: "Login fallido" });
    }
});


app.post("/obtener-usuario", function(peticion, respuesta){
    if(peticion.session.usuario) {
        respuesta.send({ usuario: peticion.session.usuario });
    } else {
        respuesta.send({ usuario: '' });
    }
});

app.get("/obtener-sesion", function(peticion, respuesta){
    respuesta.send("Valor de la variable de sesion almacenado: " + peticion.session.usuario);
});

app.get("/logout",function(peticion, respuesta){
    peticion.session.destroy();
    respuesta.redirect("home.html");
	//respuesta.send("Sesion eliminada");
});

app.get("/ruta-restringida", verificarAutenticacion, function(peticion, respuesta){
    respuesta.send("Bienvenido a la ruta restringida");
});

//Crear y levantar el servidor web.
app.listen(3000);
console.log("Servidor iniciado");
////////////////////////////////////////