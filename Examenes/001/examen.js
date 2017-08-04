
//Funciones generales
function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

function socioAleatorio(){
	var nombresNegados = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = generarNumeroAleatorioEntre(0, nombresNegados.length-1);

	return nombresNegados[indice];
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

}
Biblioteca.prototype.agregarSocio=function(socio){
	this._socios.push(socio);
}
Biblioteca.prototype.generarSocios=function(){
	for(indiceGenSocio=0;indiceGenSocio<100;indiceGenSocio++){
		nombreSocio=socioAleatorio();
		socioNuevo =new Socio(nombreSocio,indiceGenSocio);
		this.agregarSocio(socioNuevo);
	}
};
Biblioteca.prototype.ejecutarCiclo=function(){
	this.generarSocios();
}

function Libro(nombre,paginas,autor,tematica){
	this._nombre=nombre;
	this._paginas=paginas;
	this._autor=autor;
	this._tematica=tematica;

};
function Seccion(nombre){
	this._nombre=nombre;
	this._libros=[];

};
function Socio(nombre,numeroSocio){
	this._nombre=nombre;
	this._numeroSocio=numeroSocio;
	this._librosRetirados=[];
};

var bibliotecaDF = new Biblioteca("Biblioteca Polanco");
bibliotecaDF.construirBiblioteca();
bibliotecaDF.ejecutarCiclo();

