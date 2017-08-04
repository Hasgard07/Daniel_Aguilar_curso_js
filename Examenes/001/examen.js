
//Funciones generales
function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

function nombreAleatorio(){
	var nombres = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = generarNumeroAleatorioEntre(0, nombres.length-1);

	return nombres[indice];
}
function tematicaAleatorio(){
	var tematicas = ["Amor", "Aventuras", "Naturaleza", "Historia", "Viajes"];
	var indice = generarNumeroAleatorioEntre(0, tematicas.length-1);

	return tematicas[indice];
}
//definicion clases
function Biblioteca(nombre){
	this._nombre = nombre;
	this._secciones = [];
	this._socios = [];
};

Biblioteca.prototype.agregarSeccion=function(seccion){
	this._secciones.push(seccion);
}

Biblioteca.prototype.construirBiblioteca=function(){
//instanciar objetos
var seccionAmor= new Seccion("Amor");
var seccionAventuras= new Seccion("Aventuras");
var seccionNaturaleza= new Seccion("Naturaleza");
var seccionHistoria= new Seccion("Historia");
var seccionViajes= new Seccion("Viajes");
//se adiciona secciones
bibliotecaDF.agregarSeccion(seccionAmor);
bibliotecaDF.agregarSeccion(seccionAventuras);
bibliotecaDF.agregarSeccion(seccionNaturaleza);
bibliotecaDF.agregarSeccion(seccionHistoria);
bibliotecaDF.agregarSeccion(seccionViajes);

};
Biblioteca.prototype.agregarSocio=function(socio){
	this._socios.push(socio);
};
Biblioteca.prototype.generarSocios=function(){
	for(indiceGenSocio=0;indiceGenSocio<100;indiceGenSocio++){
		nombreSocio=nombreAleatorio();
		socioNuevo =new Socio(nombreSocio,indiceGenSocio+1);
		this.agregarSocio(socioNuevo);
	}
};
Biblioteca.prototype.ejecutarCiclo=function(){
	this.generarSocios();
	this.anadirLibro();
	for(var indiceSeccion=0;indiceSeccion<this._secciones.length;indiceSeccion++){
		this._secciones[indiceSeccion].ejecutarCiclo();
	}
};
Biblioteca.prototype.anadirLibro=function(){

	for(indiceGenlibros=0;indiceGenlibros<1000;indiceGenlibros++){
		nombreLibro="Libro"+indiceGenlibros.toString();
		paginasLibro=generarNumeroAleatorioEntre(100,500);
		autor=nombreAleatorio();
		//tematica=tematicaAleatorio();
		SeccionAleatoria=generarNumeroAleatorioEntre(0,this._secciones.length-1);
		seccion=this._secciones[SeccionAleatoria];
		tematica=seccion._nombre;
		nuevoLibro = new Libro(nombreLibro,paginasLibro,autor,tematica);
		seccion.agregarLibro(nuevoLibro);
	}

};
function Seccion(nombre){
	this._nombre=nombre;
	this._libros=[];

};

Seccion.prototype.agregarLibro=function(libro){

	this._libros.push(libro);
}

Seccion.prototype.ejecutarCiclo=function(){
	
	//this.ConstruirSecciones();
}
function Libro(nombre,paginas,autor,tematica){
	this._nombre=nombre;
	this._paginas=paginas;
	this._autor=autor;
	this._tematica=tematica;

};
function Socio(nombre,numeroSocio){
	this._nombre=nombre;
	this._numeroSocio=numeroSocio;
	this._librosRetirados=[];
};
Socio.prototype.devolverLibro=function(){
	var secciones=null;
	var libros=null;
	var entrega=0;
	var cantidadLibrosEntrega=0;
	secciones=bibliotecaDF._secciones;

	for(var indiceDevolucionLibro=this._librosRetirados.length;indiceDevolucionLibro<=0;indiceDevolucionLibro--){
		for(var indiceSeccion=0;indiceSeccion<secciones.length;indiSeccion++)
			if(this._librosRetirados==secciones._nombre){
				secciones[indiceSeccion]._libros.push(this._librosRetirados[indiceDevolucionLibro]);
				libros.splice(entrega, 1);
			}

	}

};
Socio.prototype.dameLibroAleatorio=function(){

var secciones=null;
var libros=null;
var entrega=0;
var cantidadLibrosEntrega=0;
secciones=bibliotecaDF._secciones;
for(var indiSeccion=0; indiSeccion<secciones.length; indiSeccion++) {
		libros=secciones[indiceBiblioteca]._libros;
		cantidadLibrosEntrega=generarNumeroAleatorioEntre(0,3);
		for(var indiceCantidadLibros=0;indiceCantidadLibros<cantidadLibrosEntrega-1;indiceCantidadLibros++){
			entrega=generarNumeroAleatorioEntre(0,libros.length-1);
			this._librosRetirados.push(libros[entrega]);
			libros.splice(entrega, 1);
		
		}
	}

};
Socio.prototype.ejecutarCiclo=function(){
	if(this._librosRetirados.length-1<0){
		this.dameLibroAleatorio();
	}
	else{
		this.entregarLibro();
		this.dameLibroAleatorio();
	}
};
var bibliotecaDF = new Biblioteca("Biblioteca Polanco");
bibliotecaDF.construirBiblioteca();
bibliotecaDF.ejecutarCiclo();

