// Funciones auxiliares
function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

//definicion clase zoo
function Zoo(nombre,ubicacion,enfermeria){
	this._nombre = nombre;
	this._ubicacion =  ubicacion;
	this._areas = [];
	this._aforo = 0;
	this._caja = 0;
	this._enfermeria = enfermeria;
	};
Zoo.prototype.agregarArea=function(area){
	this._areas.push(area);
};
Zoo.prototype.construirZoo=function(){
	var tigreBlanco = new Animal("Tigre Blanco", "Felino", 100, 80, "Egipto");
	var tigreNormal = new Animal("Tigre", "Felino", 90, 60, "Africa");
	var avestruz = new Animal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
	var flamenco = new Animal("Flamenco", "Phoenicopteridae", 50, 100, "Colombia");
	var boa = new Animal("Boa", "Serpiente", 60, 100, "Colombia");
	var camaleon = new Animal("Camaleon", "Lagarto", 5, 100, "Colombia");
	var perro = new Animal("Perro Bobby", "Pastor Alemán", 100, 0, "Alemania");
	var gato = new Animal("Gato Bobby", "Gato Alemán", 90, 0, "Alemania");

	//recintos
	var recintoAves = new Recinto("Jaula para aves no voladoras", 180, 80, "Algunas aves se pelean mucho");
	var recintoReptiles = new Recinto("Jaula para reptiles", 150, 80, "la Jaula esta hecha en vidrio");
	var recintoTigres = new Recinto("Jaula de tigres", 120, 30, "Jaula super reforzada con titanium");
	var recintoDomesicos = new Recinto("Jaula animales domensticos", 120, 30, "jaula Sencilla");
	//areas
	var areaMamiferos = new Area("Mamíferos", 5000);
	var areaAves = new Area("Aves", 200);
	var areaReptiles = new Area("Reptiles", 200);
	//agrego
	recintoTigres.agregarAnimal(tigreBlanco);
	recintoTigres.agregarAnimal(tigreNormal);
	recintoAves.agregarAnimal(avestruz);
	recintoAves.agregarAnimal(flamenco);
	recintoReptiles.agregarAnimal(boa);
	recintoReptiles.agregarAnimal(camaleon);
	recintoDomesicos.agregarAnimal(perro);
	recintoDomesicos.agregarAnimal(gato);
	areaMamiferos.agregaRecinto(recintoTigres);
	areaMamiferos.agregaRecinto(recintoDomesicos);
	areaAves.agregaRecinto(recintoAves);
	areaReptiles.agregaRecinto(recintoReptiles);
	nuevoZoo.agregarArea(areaMamiferos);
	nuevoZoo.agregarArea(areaAves);
	nuevoZoo.agregarArea(areaReptiles);
};
Zoo.prototype.ejecutarCiclo=function(){
	
	for(var indiceArea=0;indiceArea<this._areas.length;indiceArea++){
		this._areas[indiceArea].ejecutarCiclo();
	}
	enfermeriaZoo.revisarSalud(nuevoZoo);
};
function Ubicacion(direccion,ciudad,pais,telefono){
	this._direccion=direccion;
	this._ciudad=ciudad;
	this._pais=pais;
	this._telefono=telefono;
};


function Area(nombre,aforoMaximo,recintos){

	this._nombre = nombre;
	this._aforoMaximo = 0;
	this._recintos = [];
};
Area.prototype.agregaRecinto=function(Recinto){
	this._recintos.push(Recinto);
};
Area.prototype.ejecutarCiclo=function(){
	
	for(var indiceRecinto=0;indiceRecinto<this._recintos.length;indiceRecinto++){
		this._recintos[indiceRecinto].ejecutarCiclo();
	}
}
function Recinto(nombre,aforoMaximoPersonas,aforoMaximoAnimales,detalle){
	this._nombre = nombre;
	this._animales = [];
	this._personas = [];
	this._aforoMaximoPersonas = aforoMaximoPersonas;
	this._aforoMaximoAnimales = aforoMaximoAnimales;
	this._detalle = detalle;
};
Recinto.prototype.agregarAnimal=function(animal){
	this._animales.push(animal);
};
Recinto.prototype.ejecutarCiclo=function(){
	
	for(var indiceAnimales=this._animales.length-1;indiceAnimales>=0;indiceAnimales--){
		this._animales[indiceAnimales].ejecutarCiclo();
	}
};

function Animal(nombre, especie, salud, hambre, pais){
	this._nombre = nombre;
	this._especie = especie;
	this._salud = salud;
	this._hambre = hambre;
	this._pais = pais;
	//this._enfermeria = enfermeria;
	//this._recinto = recinto;
};

Animal.prototype.ganarPerderSaludAleatorioYMandarEnfermeria = function(){
	var aumentoDeSalud = generarNumeroAleatorioEntre(-10, 10);
	this._salud = this._salud + aumentoDeSalud;

	if(this._salud>100){
		this._salud = 100;
	}

	if(this._salud<0){
		this._salud = 0;
	}
	if(this._salud<50){
		ingresoEnfermeria();
	}
};

Animal.prototype.verificarHambre = function(){
	this._hambre = this._hambre + 10;
	if(this._hambre>=100){
		this._hambre=0;
		console.log(this._nombre+": me Alimentaron");
	}
};
Animal.prototype.ejecutarCiclo=function(){
	this.verificarHambre();
	
};
function Paciente(animal,recinto){
	this._animal=animal;
	this._recinto=recinto;
};
function Enfermeria(){
	this.Caso=[];
};
Enfermeria.prototype.revisarSalud=function(zoo){
	var areas=zoo._areas;
	for(var indiceAreas=0;indiceAreas<areas.length;indiceAreas++)
	{
		zooRecintos=areas[indiceAreas]._recintos;
		for(var indiceRecintos=0 ; indiceRecintos<zooRecintos.length;indiceRecintos++){
			zooAnimales=zooRecintos[indiceRecintos]._animales;
			for(var indiceAnimales=zooAnimales.length ; indiceAnimales>=0;indiceAnimales--){
				valor=generarNumeroAleatorioEntre(-10,10);
				//salud=zooAnimales[indiceAnimales]._salud;
				//salud=salud+valor;
				if(zooAnimales[indiceAnimales]._salud>100){
					zooAnimales[indiceAnimales]._salud=100;
				}
				if(zooAnimales[indiceAnimales]._salud<0){
					zooAnimales[indiceAnimales]._salud=0;
				}
				if(zooAnimales[indiceAnimales]._salud<50){
				var caso={
					animal: zooAnimales[indiceAnimales],
					recinto: zooRecintos
				}
				enfermeria.push(caso);
				var indiceRecinto = recinto.animales.indexOf(zooAnimales[indiceAnimales]);
				zooAnimales[indiceAnimales].splice(indiceRecinto,1);
				}
			}
		}
	}
	
};
Enfermeria.prototype.ingresoEnfermeria=function(animal,recinto){

	if(animal._salud<50){
		var caso = {
			animal: animal,
			recinto: recinto
		}
		this._enfermeria.push(caso);
		var indiceEnRecinto = recinto.animales.indexOf(animal);
		recinto.animales.splice(indiceEnRecinto, 1);
	}

};
function Ubiacion(direccion,ciudad,pais,telefono){

	this._direccion = direccion;
	this._ciudad = ciudad;
	this._pais = pais;
	this._telefono = telefono;

};

	//ubicacion
	var ubicacionZoo= new Ubiacion("Calle de los animalitos 123","Ciudad de México","México",999888777);
	//
	var enfermeriaZoo= new Enfermeria();
	//zoo
	var nuevoZoo = new Zoo("Zologico Mexico DF",ubicacionZoo,enfermeriaZoo);
    nuevoZoo.construirZoo();
    nuevoZoo.ejecutarCiclo();
    