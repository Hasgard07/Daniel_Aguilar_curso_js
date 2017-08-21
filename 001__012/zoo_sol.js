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
	var aforoAcual=0;
	var recintosEnMiZoo = [];
	var aforoRecintos = [];

	for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
		var area = zoo.areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
			var recinto = area.recintos[indiceRecintos];
			if (recinto.personas.length<recinto.aforoMaximoPersonas)
			{
				recintosEnMiZoo.push(recinto);
			}

		}
	}
	 if(recintosEnMiZoo.length>0)
	 {
	 	var indiceAleatorio = generarNumeroAleatorioEntre(0, recintosEnMiZoo.length-1);
		recinto = recintosEnMiZoo[indiceAleatorio];
		return recinto;
	 }
	 else{
	 	console.error("!! ZOO lleno !!!")
	 }
	
}
function cobrarIngreso(cobroPersona){
	var estado=0;

	if (cobroPersona.edad>14 && cobroPersona.edad<65){
		if(cobroPersona.estudiante!=0)
		{
			if(cobroPersona.dinero>=5){
				cobroPersona.dinero=cobroPersona.dinero-5;
				zoo.caja=zoo.caja+5;
				estado=1;
				}
		}
		else{
			if(cobroPersona.dinero>=3){
				cobroPersona.dinero=cobroPersona.dinero-3;
				zoo.caja=zoo.caja+3;
			}
		}

	}
	else{
		estado=2;
	}
	return estado;
}
// Añade personas de forma aleatoria
function insertarPersonasAleatoriamente(numeroPersonas){
		var cobro=0;
	for(var i=0; i<numeroPersonas; i++){
		var persona = crearPersonaAleatoria();
		var recintoAleatorio = dameRecintoAleatorio();

		if(recintoAleatorio.aforoMaximoPersonas>recintoAleatorio.personas.length){
			var cobro = cobrarIngreso(persona);
			if(cobro!=0)
			{
				recintoAleatorio.personas.push(persona);
			}
			else{
				console.error(persona.nombre + " no tiene dinero sufciciente par ingresar  al Zoo");
			}
			
		}else{
			console.error(persona.nombre + " no cabe en el recinto " + recintoAleatorio.nombre);
		}
	}
}

function insertarPersonaAleatoriamente(){
		var cobro=0;
		var persona = crearPersonaAleatoria();
		var recintoAleatorio = dameRecintoAleatorio();

		if(recintoAleatorio.aforoMaximoPersonas>recintoAleatorio.personas.length){
			var cobro = cobrarIngreso(persona);
			if(cobro!=0)
				{
					recintoAleatorio.personas.push(persona);
					console.log(persona.nombre + " se Cobra Entrada al Zoo");
				}
				else{
					console.error(persona.nombre + " no tiene dinero sufciciente par ingresar  al Zoo");
				}
			
		}else{
			console.error(persona.nombre + " no cabe en el recinto " + recintoAleatorio.nombre);
		}
}
function eliminarPersona(){
		var salida=0;
		var recintoAleatorio = dameRecintoAleatorio();
		salida=generarNumeroAleatorioEntre(0,recintoAleatorio.personas.length-1);
		if(salida!=0){
		console.log(recintoAleatorio.personas[salida].nombre + " se ha retirado del Zoo");
		recintoAleatorio.personas.splice(salida,1);
	}

}

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 0,
	caja: 0,
	enfermeria:[]
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
		detalle: detalle,
	};

}

function crearAnimal(nombre, especie, salud, hambre, pais){
	var creaAnimal = {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais,
		saludAleatoria: function(enfermeria,recinto){
			valor=generarNumeroAleatorioEntre(-10,10);
			this.salud=this.salud+valor;
			if(this.salud>100){
				this.salud=100;
			}
			if(this.salud<0){
				this.salud=0;
			}
			if(this.salud<50){
				var caso={
					animal: this,
					recinto: recinto
				}
				enfermeria.push(caso);
				var indiceRecinto = recinto.animales.indexOf(this);
				recinto.animales.splice(indiceRecinto,1);
			}
		},
		aumentarHambre: function(){
			this.hambre=this.hambre+10
		},
		ejecutarCiclo: function(enfermeria,recinto){
			this.aumentarHambre();
			this.saludAleatoria(enfermeria,recinto);
		}
	};
	return creaAnimal;
}

function crearPersonaAleatoria(){
	return {
		nombre: generarNombreAleatorio(),
		edad: generarNumeroAleatorioEntre(1, 90),
		dinero: generarNumeroAleatorioEntre(0, 1000),
		estudiante: generarNumeroAleatorioEntre(0,1)
	};


}

//
function addicionAreaZoo(addAreanueva){
	zoo.areas.push(addAreanueva);
	zoo.aforo = zoo.aforo+ addAreanueva.aforoMaximo;
}
function addicionPaciente(addAnimal,addrecinto){
	var paciente={
			animal: addAnimal,
			recinto: addrecinto
		};
		zoo.enfermeria.push(paciente);

}
//
function addicionRecintoArea(addrecinto,addarea){
	addarea.recintos.push(addrecinto);
	addarea.aforoMaximo=addarea.aforoMaximo+addrecinto.aforoMaximoPersonas;
	// Para mirar si un área ya está dentro del zoo:

	if(zoo.areas.indexOf(addarea) != -1){

		zoo.aforo = zoo.aforo + addrecinto.aforoMaximoPersonas;
	}
	// ese area ya está en el zoo
}
function ejecutarIntervalo(){
	cicloejecutado=cicloejecutado+1;
	if(cicloejecutado<=50){
		console.log("Ejecutando ciclo "+cicloejecutado);
		var accion=0;
		insertarPersonasAleatoriamente(10);
		ejecutarCiclo();
		//cicloAnimal();
	}
	else{
		clearInterval(idInterval);
	}
}
function dameAnimalAleatorio(resinto){
	var animal = null;
	var animalAleatorio=0;
	animalAleatorio=generarNumeroAleatorioEntre(0,resinto.animales.length);
	animal=resinto.animales[animalAleatorio];
	return animal;
}
/*function asignarEfernmeria(animalEnfermo,resinto){

	zoo.enfermeria.[recintos].push(resinto);
	zoo.enfermeria.animales.push(animalEnfermo);
	return zoo.enfermeria;
}*/
function alimentacionAnimales(){
	var zooAreas=null;
	var zooRecintos=null;
	var zooAnimales=null;
	zooAreas=zoo.areas;
	for(var indiceAreas=0;indiceAreas<zooAreas.length;indiceAreas++)
	{
		zooRecintos=zooAreas[indiceAreas].recintos;
		for(var indiceRecintos=0 ; indiceRecintos<zooRecintos.length;indiceRecintos++){
			zooAnimales=zoo.areas[indiceAreas].recintos[indiceRecintos].animales;
			for(var indiceAnimales=0 ; indiceAnimales<zooAnimales.length;indiceAnimales++){
				
				zooAnimales[indiceAnimales].hambre=zooAnimales[indiceAnimales].hambre+10;
				if(zooAnimales[indiceAnimales].hambre>=100)
					{
						zooAnimales[indiceAnimales].hambre=0;
					}
					
			}


		}
	}
}
function ejecutarCiclo(){
	var estadoSalud=0;
	var puntosSalud=0;
	var zooAreas=null;
	var zooRecintos=null;
	var zooAnimales=null;
	zooAreas=zoo.areas;
	for(var indiceAreas=0;indiceAreas<zooAreas.length;indiceAreas++)
	{
		zooRecintos=zooAreas[indiceAreas].recintos;
		for(var indiceRecintos=0 ; indiceRecintos<zooRecintos.length;indiceRecintos++){
			zooAnimales=zoo.areas[indiceAreas].recintos[indiceRecintos].animales;
			for(var indiceAnimales=zooAnimales.length-1; indiceAnimales>=0;indiceAnimales--){
				enfermeriaZoo=zoo.enfermeria,zooRecintos;

				zooAnimales[indiceAnimales].ejecutarCiclo(zoo.enfermeria,zooRecintos[indiceRecintos]);

			}


		}
	}
}
function recuperacion(){
	var recinto=null;
	var animal=null;
	var enfermeria;
	var salud=0;
	for(indiceEnfermeria=zoo.enfermeria.length-1;indiceEnfermeria>=0;indiceEnfermeria--){
		salud=zoo.enfermeria[indiceEnfermeria].animal.salud;
		zoo.enfermeria[indiceEnfermeria].animal.salud=zoo.enfermeria[indiceEnfermeria].animal.salud+10;
		if(zoo.enfermeria[indiceEnfermeria].animal.salud>=100){
			zoo.enfermeria[indiceEnfermeria].animal.salud=100;
			recinto=zoo.enfermeria[indiceEnfermeria].recinto;
			recinto.animales.push(zoo.enfermeria[indiceEnfermeria].animal.salud);
			zoo.enfermeria.splice(indiceEnfermeria,1);
		}
	}

}
function cicloAnimal(){
	var estadoSalud=0;
	var estadoactual=0;
	var puntosSalud=0;
	var animalAleatorio=null;
	var recintoAleatorio = null;
	estadoSalud=generarNumeroAleatorioEntre(0,1);
	puntosSalud=generarNumeroAleatorioEntre(0,10);
	saludAnimal();
	alimentacionAnimales();
	recuperacion();
}
// Creo animales
var tigreBlanco = crearAnimal("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = crearAnimal("Tigre", "Felino", 90, 60, "Africa");
var avestruz = crearAnimal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
var flamenco = crearAnimal("Flamenco", "Phoenicopteridae", 50, 100, "Colombia");
var boa = crearAnimal("Boa", "Serpiente", 60, 100, "Colombia");
var camaleon = crearAnimal("Camaleon", "Lagarto", 5, 100, "Colombia");

// Creo recintos 
var recintoTigres = crearRecinto("Jaula de tigres", 120, 30, "Jaula super reforzada con titanium");
var recintoAves = crearRecinto("Jaula para aves no voladoras", 180, 80, "Algunas aves se pelean mucho");
var recintoReptiles = crearRecinto("Jaula para reptiles", 150, 80, "la Jaula esta hecha en vidrio");


// Creo areas
var areaMamiferos = crearArea("Mamíferos", 5000);
var areaAves = crearArea("Aves", 200);
var areaReptiles = crearArea("Reptiles", 200);

// Añado los animales a los recintos
recintoTigres.animales.push(tigreBlanco, tigreNormal);
recintoAves.animales.push(avestruz, flamenco);
recintoReptiles.animales.push(boa, camaleon);


// Añado los recintos a las áreas
addicionRecintoArea(recintoTigres,areaMamiferos);
addicionRecintoArea(recintoAves,areaAves);
addicionRecintoArea(recintoReptiles,areaReptiles);
//Añado las áreas al zoo
addicionAreaZoo(areaMamiferos);
addicionAreaZoo(areaAves);
addicionAreaZoo(areaReptiles);
// Añado 100 personas
var cicloejecutado=0;
var idInterval=setInterval(ejecutarIntervalo,3000,);

console.log(zoo);