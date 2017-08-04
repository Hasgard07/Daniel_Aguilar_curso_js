
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
function Biblioteca(nombre){
	this._nombre = nombre;
	this._secciones = [];
	this._socios = [];
};
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
	this.__librosRetirados[];

}
