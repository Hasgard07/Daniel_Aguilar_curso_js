/*function saludar(nombrePersona,momentoDelDia){
	var Mensaje = "";

	switch(momentoDelDia){
		case "mañana":
			Mensaje="Buenos Dias " + nombrePersona;
		break;
		case "tarde":
			Mensaje="Buenos tardes " + nombrePersona;
		break;
		case "noche":
			Mensaje="Buenos noche " + nombrePersona;
		break;
		default:
			Mensaje="Hola " + nombrePersona;
		break;
	}
	console.log(Mensaje);
	alert(Mensaje);
}
var personas="Maria y jose";
var momento="tarde";
saludar(personas,momento);*/
//asignacion de primitivos
/*var cadena = "Soy la cadena 1";
var cadena2= "soy la cadena 2";
var cadena3= cadena;

console.log(cadena3==cadena);
cadena3="ahora soy cadena 3";
console.log(cadena3==cadena);*/
//asignacio referencia
//control+D replace
/*var cadena ={
	text0:"Soy cadena 1"
}
var cadena3= cadena;
console.log(cadena3==cadena);
cadena3.texto="ahora soy cadena 3";
console.log(cadena3==cadena);*/
/*
var persona={
	nombre:"Daniel",
	apellido:"Aguilar"
}

var persona2={
	nombre:"Gabriel",
	apellido:"Lopez"
}
var ordenadorPersona={
	marca:"Asus",
	pulgadas:15
}
persona.ordenador=ordenadorPersona;
persona2.ordenador=ordenadorPersona;
console.log(persona.ordenador.marca)
*/

var variable;
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));
variable = 10;
console.log("Valor: " + variable + " | Tipo: " + typeof(variable)); 
variable = "texto";
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));
variable = true;
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));
variable = null;
console.log("Valor: " + variable + " | Tipo: " + typeof(variable));
//for-in
//recorrer todas las propiedades de un objeto
//for-each array
