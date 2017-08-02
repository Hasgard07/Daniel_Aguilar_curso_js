/*

Realiza una función que reciba un string y devuelva un objeto contando el 
número de apariciones de cada letra en el string.
Almacena y devuelve el resultado en un objeto.

Asegúrate de que la función cumple su cometido haciendo uso de los tests aportados.

*/
//objeto unitario
/*
function cuentaCaracteres(cadenaAparece){
		var cadenaContar=cadenaAparece.split("");
		var apacicionesCadena={ocurrencia: "",letra:""};
		var resultado=0;
		var patron = "";
		var cadenatem=cadenaAparece;
		for(var int=0;int<cadenaContar.length;int++){
			apacicionesCadena.letra=cadenaContar[int];
			for(var int1=0;int1<cadenaContar.length;int1++){
				if(cadenaContar[int]==cadenaContar[int1]){
					resultado=resultado+1
				}
				apacicionesCadena.ocurrencia=resultado;
			
			}
			console.log("Letra: " + apacicionesCadena.letra+ " Ocurrencia: "+apacicionesCadena.ocurrencia);
			patron = new RegExp(apacicionesCadena.letra, 'g');

			cadenatem=cadenatem.replace(patron , "");
			cadenaContar=cadenatem.split("");
			resultado=0;
		}
	
}*/
//objeto dinamico
var apacicionesCadena={};
function cuentaCaracteres(cadenaAparece){
		//var apacicionesCadena={};
		var cadenaContar=cadenaAparece.split("");
		var resultado=0;
		var patron = "";
		var cadenatem=cadenaAparece;
		var letra="";
		for(var int=0;int<cadenaContar.length;int++){
			letra=cadenaContar[int];
			for(var int1=0;int1<cadenaContar.length;int1++){
				if(cadenaContar[int]==cadenaContar[int1]){
					resultado=resultado+1;
				}
				//apacicionesCadena[letra]=resultado;
			
			}
			apacicionesCadena[letra]=resultado;
			console.log(apacicionesCadena);
			patron = new RegExp(letra, 'g');

			cadenatem=cadenatem.replace(patron , "");
			cadenaContar=cadenatem.split("");
			resultado=0;
		}
	
}

/*resultado = {
	a: 3,
	d: 7,
	f: 4
}*/

// AYUDA:
//var arrayDeCaracteres = nombreDeString.split("");

// Tests
cuentaCaracteres("abbabcbdbabdbdbabababcbcbab");
/*
resultadoContador = cuentaCaracteres("abbabcbdbabdbdbabababcbcbab");
console.log( resultadoContador['a'] === 7);
console.log( resultadoContador.b === 14);
console.log( resultadoContador['c'] === 3);

resultadoContador = contadorDeCaracteres("xyyyxyxyxzyxyzyxyxyasdfz");
console.log( resultadoContador.x === 7 );
console.log( resultadoContador['y'] === 10 );
console.log( resultadoContador.z === 3 );
console.log( resultadoContador['a'] === 1 );
console.log( resultadoContador['s'] === 1 );
console.log( resultadoContador.d === 1 );
console.log( resultadoContador['f'] === 1 );
*/