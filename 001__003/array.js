function calculoArray(arraycadena){
var arrayMasGrande=0;
var tamano=0;
//console.log('tamaño array: '+arraycadena.length);
for(var indice=0;indice<arraycadena.length;indice++){
	//console.log('tamaño string en el array: '+arraycadena[indice].length);
	if(arraycadena[indice].length>arrayMasGrande){
		arrayMasGrande=indice+1;
		tamano=arraycadena[indice].length;
	}


}
console.log("la cadena mas grande esta en la posicion: "+arrayMasGrande);
console.log("el tamaño de esta posicion es: "+tamano)
}

var array = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
calculoArray(array);