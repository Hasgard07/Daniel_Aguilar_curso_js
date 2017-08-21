
function Aleatorios(){

}

//Funciones generales
Aleatorios.prototype.generarNumeroAleatorioEntre=function(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

Aleatorios.prototype.marcaAleatorio=function(){
	var nombres = ["Renaul", "Nissan", "Ford", "Fiat", "Sead", "Totota", "Ferrary", "Mercedes", "BMW","Kia"];
	var indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

	return nombres[indice];
}
Aleatorios.prototype.modeloAleatorio=function(){
	var tematicas = ["A4", "Ibiza", "Sentra", "Duster", "488 Spider","Yaris","320","Ecosport"]
	var indice = this.generarNumeroAleatorioEntre(0, tematicas.length-1);

	return tematicas[indice];
}
function Vehiculo(){
	var aleatorios= new Aleatorios();
	this._marca=aleatorios.marcaAleatorio();
	this._modelo=aleatorios.modeloAleatorio();
	this._velocidad_maxima=aleatorios.generarNumeroAleatorioEntre(100,200);
}

function Carrera(pista){

	this._logitud=pista;
}
Carrera.prototype.iniciarCarrera=function(){
	var vehiculo1= new Vehiculo();
	var vehiculo2= new Vehiculo();
	console.log("velocidad vehiculo1: "+vehiculo1);
	console.log("velocidad vehiculo2: "+vehiculo1);

}
var pruebaVelocidad= new Carrera();
pruebaVelocidad.iniciarCarrera();