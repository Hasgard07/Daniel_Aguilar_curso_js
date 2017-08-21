
function crearImg(tipo,nomclass,origen,path){
	var elementoCreado=null;
	elementoCreado=document.createElement(tipo);
	elementoCreado.setAttribute("class",nomclass);
	elementoCreado.setAttribute(origen,path);
	return elementoCreado;
}
function Aleatorios(){

};

//Funciones generales
Aleatorios.prototype.generarNumeroAleatorioEntre=function(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
};

Aleatorios.prototype.marcaAleatorio=function(){
	var nombres = ["Renaul", "Nissan", "Ford", "Fiat", "Sead", "Totota", "Ferrary", "Mercedes", "BMW","Kia"];
	var indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

	return nombres[indice];
};
Aleatorios.prototype.modeloAleatorio=function(){
	var tematicas = ["A4", "Ibiza", "Sentra", "Duster", "488 Spider","Yaris","320","Ecosport"]
	var indice = this.generarNumeroAleatorioEntre(0, tematicas.length-1);

	return tematicas[indice];
};
Aleatorios.prototype.getMetrosQueAvanzaCadaSegundo=function(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

function Vehiculo(){
	var aleatorios= new Aleatorios();
	this._marca=aleatorios.marcaAleatorio();
	this._modelo=aleatorios.modeloAleatorio();
	this._velocidad_maxima=aleatorios.generarNumeroAleatorioEntre(100,200);
	this._posicion=0;
	this._avatar=aleatorios.generarNumeroAleatorioEntre(0,9);
	
};
function Carrera(distancia,participantes){

	this.pista=distancia;
	this._participantes=[];
	this._resultado=[];
	for(indiceParticipantes=0;indiceParticipantes<participantes;indiceParticipantes++)
		{
			var vehiculo= new Vehiculo();
			this._participantes.push(vehiculo);
		}
};
Carrera.prototype.iniciarCarrera=function(){
	
		var ejecucionCarrera=this;
		this.renderCarrera();
		idserinterval = setInterval(function(){ejecucionCarrera.avanzaCarrera()}, 1000);

};
Carrera.prototype.avanzaCarrera=function(){
	var aleatorios= new Aleatorios();
	var participantes=this._participantes.length;
	var velocidad=0;
	var posicion=0;
	for(indiceParticipantes=0;indiceParticipantes<participantes;indiceParticipantes++)
		{
			velocidad=0;
			posicion=0;
			velocidad=aleatorios.getMetrosQueAvanzaCadaSegundo(this._participantes[indiceParticipantes]._velocidad_maxima);
			posicion=this._participantes[indiceParticipantes]._posicion;
			if(this._participantes[indiceParticipantes]._posicion<=this.pista){
				this._participantes[indiceParticipantes]._posicion=this._participantes[indiceParticipantes]._posicion+velocidad;
			}
			this.moverVehiculo();
			if(this._participantes[indiceParticipantes]._posicion>=this.pista)
				{
					console.log("Participante"+indiceParticipantes+" Ha llegado a la Meta")
					this._resultado.push(indiceParticipantes);
					//indiceParticipantes=participantes;
					//clearInterval(idserinterval);
				}
		}
		if(this._participantes[0]._posicion>=this.pista&&this._participantes[1]._posicion>=this.pista)
		{
			this.renderResultados();
			clearInterval(idserinterval);
		}
}
Carrera.prototype.renderCarrera=function(){
	var avatar=["img/vehiculo1.png","img/vehiculo2.png","img/vehiculo3.png","img/vehiculo4.png","img/vehiculo5.png","img/vehiculo6.png","img/vehiculo7.png","img/vehiculo8.png","img/vehiculo9.png","img/vehiculo10.png"];
	var carril1 = document.querySelector(".carril1");
	var carril2 = document.querySelector(".carril2");
	var img1=this._participantes[0]._avatar;
	var img2=this._participantes[1]._avatar;
	var vehiculolo1=crearImg("img","vehiculo","src",avatar[img1]);
	var vehiculolo2=crearImg("img","vehiculo","src",avatar[img2]);
	carril1.appendChild(vehiculolo1);
	carril2.appendChild(vehiculolo2);
}
Carrera.prototype.moverVehiculo=function(){
	var vehiculos = document.querySelectorAll(".vehiculo");
	var posicion=0;
	var margen="";
	for(indice=0;indice<this._participantes.length;indice++)
	{
		posicion=0;
		posicion=this._participantes[indice]._posicion
		posicion=posicion*2;
		margen="margin-left:"+posicion+"px";
		vehiculos[indice].setAttribute("style",margen);

	}
}
Carrera.prototype.renderResultados=function(){
	var aleatorios =new Aleatorios;
	var col1 = document.querySelectorAll(".col1");
	var col2 = document.querySelectorAll(".col2");
	var col3 = document.querySelectorAll(".col3");
	var col4 = document.querySelectorAll(".col4");
	var col5 = document.querySelectorAll(".col5");
	var col6 = document.querySelectorAll(".col6");
	var tiempo=0;
	for(indicetabla=0;indicetabla<this._participantes.length;indicetabla++){
		tiempo=0;
		col1[indicetabla].innerHTML=this._resultado[indicetabla];
		tiempo=this._participantes[indicetabla]._resultado;
		tiempo=tiempo/600;
		col2[indicetabla].innerHTML=tiempo;
	}

}

window.onload=function(){
	var pruebaVelocidad= new Carrera(500,2);
	pruebaVelocidad.iniciarCarrera();
	var idserinterval;
};
