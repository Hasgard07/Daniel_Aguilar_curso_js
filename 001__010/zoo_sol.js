// Funciones auxiliares
function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

function generarNombreAleatorio(){
	var nombresNegados = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = generarNumeroAleatorioEntre(0, nombresNegados.length-1);

	return nombresNegados[indice];
}

function dameRecintoAleatorio(){
	var recinto = null;
	var recintosEnMiZoo = [];

	for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
		var area = zoo.areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
			var recinto = area.recintos[indiceRecintos];
			recintosEnMiZoo.push(recinto);
		}
	}

	var indiceAleatorio = generarNumeroAleatorioEntre(0, recintosEnMiZoo.length-1);
	recinto = recintosEnMiZoo[indiceAleatorio];

	return recinto;
}
function cobrarIngreso(cobroPersona){
	var estado=0;

	if (cobroPersona.edad>14||cobroPersona.edad<65){
		if(cobroPersona.dinero<=5){
			cobroPersona.dinero=cobroPersona.dinero-5;
			zoo.caja=zoo.caja+5;
			estado=1;
		}
	}
	else{
		estado=2;
	}
	return estado;
}
// Añade personas de forma aleatoria
function insertarPersonasAleatoriamente(numeroPersonas){
	for(var i=0; i<numeroPersonas; i++){
		var persona = crearPersonaAleatoria();
		var recintoAleatorio = dameRecintoAleatorio();

		if(recintoAleatorio.aforoMaximoPersonas>recintoAleatorio.personas.length){
			recintoAleatorio.personas.push(persona);
		}else{
			console.error(persona.nombre + " no cabe en el recinto " + recintoAleatorio.nombre);
		}
	}
}


var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 0,
	caja: 0
};

var ubicacion = {
	direccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

// Seteamos la ubicacion
zoo.ubicacion = ubicacion;

function crearArea(nombre){
	var area = {
		nombre: nombre,
		aforoMaximo: 0,
		recintos: [],
	};
	return area;
}


function crearRecinto(nombre, aforoMaximoPersonas, aforoMaximoAnimales, detalle){
	return {
		nombre: nombre,
		animales: [],
		personas: [],
		aforoMaximoPersonas: aforoMaximoPersonas,
		aforoMaximoAnimales: aforoMaximoAnimales,
		detalle: detalle
	};

}

function crearAnimal(nombre, especie, salud, hambre, pais){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais
	};
}

function crearPersonaAleatoria(){
	return {
		nombre: generarNombreAleatorio(),
		edad: generarNumeroAleatorioEntre(1, 90),
		dinero: generarNumeroAleatorioEntre(0, 1000)
		estudiante:generarNumeroAleatorioEntre(0,1)
	}
}

//
function addicionAreaZoo(addAreanueva){
	zoo.areas.push(addAreanueva);
	zoo.aforo = zoo.aforo+ addAreanueva.aforoMaximo;
}
//
function addicionRecintoArea(addrecinto,addarea){
	addarea.recintos.push(addrecinto);
	addarea.aforoMaximo=addarea.aforoMaximo+addrecinto.aforoMaximoPersonas;
	// Para mirar si un área ya está dentro del zoo:

	if(zoo.areas.indexOf(areaABuscar) != -1){

		zoo.aforo = zoo.aforo + addrecinto.aforoMaximoPersonas;
	}
	// ese area ya está en el zoo
}

}
function ingresoPersonas(){
	var nuevoIngreso;

	return estado;
}
// Creo animales
var tigreBlanco = crearAnimal("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = crearAnimal("Tigre", "Felino", 90, 60, "Africa");
var avestruz = crearAnimal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
var flamenco = crearAnimal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia");

// Creo recintos 
var recintoTigres = crearRecinto("Jaula de tigres", 80, 30, "Jaula super reforzada con titanium");
var recintoAves = crearRecinto("Jaula para aves no voladoras", 100, 80, "Algunas aves se pelean mucho");

// Creo areas
var areaMamiferos = crearArea("Mamíferos", 5000);
var areaAves = crearArea("Aves", 200);

// Añado los animales a los recintos
recintoTigres.animales.push(tigreBlanco, tigreNormal);
recintoAves.animales.push(avestruz, flamenco);

// Añado los recintos a las áreas
addicionRecintoArea(recintoTigres,areaMamiferos);
addicionRecintoArea(recintoAves,areaAves);
//Añado las áreas al zoo
addicionAreaZoo(areaMamiferos);
addicionAreaZoo(areaAves);
// Añado 100 personas
insertarPersonasAleatoriamente(1000);

console.log(zoo);