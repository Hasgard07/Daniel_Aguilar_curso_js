/*

Vamos a complicar el ejercicio anterior:
Ahora cada vez que calculemos la longitud del string más largo, almacenaremos el resultado en un array de resultados.
Una vez ejecutados varios cálculos de longitud (4 en el ejemplo), vamos a calcular la media de los resultados.

*/
function calculoArray(arraycadena){
var arrayMasGrande=0;
var tamano=0;
//console.log('tamaño array: '+arraycadena.length);
for(var indice=0;indice<arraycadena.length;indice++){
	//console.log('tamaño string en el array: '+arraycadena[indice].length);
	if(arraycadena[indice].length>tamano){
		//arrayMasGrande=indice;
		tamano=arraycadena[indice].length;
	}


	}
	//console.log("la cadena mas grande esta en la posicion: "+arrayMasGrande);
//console.log("el tamaño de esta posicion es: "+tamano)
return tamano;
}
function arrayMedia(arrayMedia){
	var media=0;
	for(var ind=0;ind<arrayMedia.length;ind++){
		media=media+arrayMedia[ind];

	}
	media=media/arrayMedia.length;
	console.log("la media es "+media);

}

var resultados = [];

var arrayDeTest1 = ["Richie", "Joanie", "Greg", "Marcia", "Bobby"];
var arrayDeTest2 = ["Blanka", "Zangief", "Chun Li", "Guile"];
var arrayDeTest3 = ["Red", "Blue", "Green"];
var arrayDeTest4 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];

resultados.push(calculoArray(arrayDeTest1));
resultados.push(calculoArray(arrayDeTest2));
resultados.push(calculoArray(arrayDeTest3));
resultados.push(calculoArray(arrayDeTest4));
arrayMedia(resultados);


// resultados = [6, 7, 5, 19];
//media(resultados) ==> 9,25