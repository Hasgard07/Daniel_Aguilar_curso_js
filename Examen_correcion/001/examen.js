
function Aleatorios(){

}

//Funciones generales
Aleatorios.prototype.generarNumeroAleatorioEntre=function(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

Aleatorios.prototype.nombreAleatorio=function(){
	var nombres = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

	return nombres[indice];
}
Aleatorios.prototype.tematicaAleatorio=function(){
	var tematicas = ["Amor", "Aventuras", "Naturaleza", "Historia", "Viajes"];
	var indice = this.generarNumeroAleatorioEntre(0, tematicas.length-1);

	return tematicas[indice];
}
//definicion clases
function Biblioteca(nombre){
	this._nombre = nombre;
	this._secciones = [];
	this._socios = [];
	this.construirBiblioteca();
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
	this.agregarSeccion(seccionAmor);
	this.agregarSeccion(seccionAventuras);
	this.agregarSeccion(seccionNaturaleza);
	this.agregarSeccion(seccionHistoria);
	this.agregarSeccion(seccionViajes);
	for(var indiceLibros=0;indiceLibros<1000;indiceLibros++){
		this.anadirLibro(indiceLibros);
	}
	for(indiceGenSocio=0;indiceGenSocio<100;indiceGenSocio++){
		this.agregarSocio(indiceGenSocio);
	}

};
Biblioteca.prototype.agregarSocio=function(indice){
	var aleatorio=new Aleatorios();
	nombreSocio=aleatorio.nombreAleatorio();
	socioNuevo =new Socio(nombreSocio,indice+1);
	this._socios.push(socioNuevo);
};

Biblioteca.prototype.ejecutarCiclo=function(){
	var canrtidadSocios=this._socios.length-1;
		for(indice=0;indice<canrtidadSocios;indice++)
		{
			this._socios[indice].ejecutarCiclo(this);
		}
	    this.imprimirEstado();

};
Biblioteca.prototype.anadirLibro=function(indice){
	var aleatorio=new Aleatorios();
	var nuevoLibro=null;
	nombreLibro="Libro"+indice;
	paginasLibro=aleatorio.generarNumeroAleatorioEntre(100,500);
	autor=aleatorio.nombreAleatorio();
	SeccionAleatoria=aleatorio.generarNumeroAleatorioEntre(0,this._secciones.length-1);
	seccion=this._secciones[SeccionAleatoria]._nombre;
	nuevoLibro = new Libro(nombreLibro,paginasLibro,autor,seccion);
	this._secciones[SeccionAleatoria]._libros.push(nuevoLibro);
};
Biblioteca.prototype.dameLibroAleatorio=function(){
	var secciones=null;
	var librosretorno=null;
	var aleatorio=new Aleatorios();
	secciones=this._secciones.length-1;
	seccionaRetirar=aleatorio.generarNumeroAleatorioEntre(0,secciones);
	entregalibloAleatorio=this._secciones[seccionaRetirar]._libros.length-1
	entregalibloAleatorio=aleatorio.generarNumeroAleatorioEntre(0,entregalibloAleatorio);
	librosretorno=this._secciones[seccionaRetirar]._libros[entregalibloAleatorio];
	this._secciones[seccionaRetirar]._libros.splice(entregalibloAleatorio,1);
	return librosretorno;
}
Biblioteca.prototype.devolverLibro=function(libro){
	var cantidadSecciones=0;
	cantidadSecciones=this._secciones.length;
	for(var indiceSecciones=0;indiceSecciones<cantidadSecciones;indiceSecciones++){
		if(libro._tematica==this._secciones[indiceSecciones]._nombre){
			this._secciones[indiceSecciones]._libros.push(libro);
		}
	}
}

Biblioteca.prototype.imprimirEstado=function(){
	var total1=0;
	var total2=0;
	console.log("Biblioteca "+this._nombre);
	console.log("");
	console.log("Sección Amor");
	console.log("   Numero de libros: "+this._secciones[0]._libros.length);
	console.log("Sección Aventuras");
	console.log("   Numero de libros: "+this._secciones[1]._libros.length);
	console.log("Sección Naturaleza");
	console.log("   Numero de libros: "+this._secciones[2]._libros.length);
	console.log("Sección Historia");
	console.log("   Numero de libros: "+this._secciones[3]._libros.length);
	console.log("Sección Viajes");
	console.log("   Numero de libros: "+this._secciones[4]._libros.length);
	console.log("");
	for(var indice=0;indice<this._secciones.length;indice++)
	{
		total1=total1+this._secciones[indice]._libros.length;
	}
	for(var indiceSocios=0;indiceSocios<this._socios.length;indiceSocios++){
		total2=total2+this._socios[indiceSocios]._librosRetirados.length;
	}
	console.log("Total de libros en la biblioteca: "+total1);
	console.log("Total de libros prestados a los socios: "+total2);
}
function Seccion(nombre){
	this._nombre=nombre;
	this._libros=[];

};

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

Socio.prototype.ejecutarCiclo=function(miBiblioteca){

	var aleatorio=new Aleatorios();
	
	for (var i = this._librosRetirados.length - 1; i >= 0; i--) {
		miBiblioteca.devolverLibro(this._librosRetirados[i]);
		this._librosRetirados.splice(i,1);
	}
	cantidadLibrosEntrega=aleatorio.generarNumeroAleatorioEntre(0,3);
	for(indiceSocio=0;indiceSocio<cantidadLibrosEntrega;indiceSocio++)
	{
		this._librosRetirados.push(miBiblioteca.dameLibroAleatorio());
	}

};
var bibliotecaDF = new Biblioteca("Biblioteca Polanco");
setInterval(function(){ bibliotecaDF.ejecutarCiclo();}, 1000);


