/*

Ejercicio 001__009: 
Realiza las funciones siguientes 

*/


// Esta función recibe un string y devuelve el string inverso
// Por ejemplo: para el string "Hola clase!" debe devolver "!esalc aloH"
var salida;


function stringInverso(string) {
	var cadenaEntrada=string.split("");
	var cadenaInvertida="";
	var final=cadenaEntrada.length;
	final= final -1;
	for(var i=final;i>=0;i--){
		cadenaInvertida=cadenaInvertida+cadenaEntrada[i];
	}

	return cadenaInvertida;
}



// Esta función debe recibir un string y devolver el mismo string sin espacios
function eliminarEspacios(string) {
	// Con expresión regular
	var cadena=string;
	cadena = cadena.replace(/\s/g, '');
	return cadena;
}


// Esta función debe recinir un string y devolverlo con todas sus letras mayúsculas

function ponerTodasLasLetrasMayusculas(string){
	var cadenaSalida=string;
	cadenaSalida=cadenaSalida.toUpperCase();
	return cadenaSalida;
}
salida=ponerTodasLasLetrasMayusculas('Hola clase');
console.log(salida);
// Esta función debe recibir un string y decir si es un palíndromo (true / false)
// Un palíndromo es una frase que se lee igual al derecho que al revés
// Haz uso de las tres funciones anteriores
function esPalindromo(string) {
	var palindromo=string;
	var cadenaIngresa=string;
    var cadenaEntrega="";
	cadenaEntrega=eliminarEspacios(palindromo);
	cadenaEntrega=ponerTodasLasLetrasMayusculas(cadenaEntrega);
	cadenaIngresa=eliminarEspacios(cadenaIngresa);
	cadenaIngresa=ponerTodasLasLetrasMayusculas(cadenaIngresa);
	cadenaEntrega=stringInverso(cadenaEntrega);
	if(cadenaEntrega==cadenaIngresa){
		return true;
	}
	return false;

}

salida=esPalindromo('Arde ya la yedra');
console.log(salida);

salida=esPalindromo('Ana lava lana');
console.log(salida);

salida=esPalindromo('Anita lava la tina');
console.log(salida);
//  Ejemplos de palíndromos:

// Arde ya la yedra
// Ana lava lana
// Anita lava la tina
