/*

Escribe una función que reciba un string de números separados por dos puntos,
cree un array a partir del string y devuelva la media de todos lo valores

*/


// Tests

var stringDeNumeros = '80:70:90:100';
// La función debe devolver 85
function arrayPartir(){
	var total=0;
	var cadena=stringDeNumeros.split(":");
	for(var i=0;i<cadena.length;i++)
	{
		total=total+Number(cadena[i]);
	}
	total=total/cadena.length;
	console.log(total);
}
arrayPartir();
// Bonus

// Misma funcionalidad pero eliminando los repetidos
//var stringDeNumeros = '80:70:90:100:100:100:100';
// también deberá devolver 85

