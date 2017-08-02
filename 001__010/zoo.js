/*

Realiza la modelización de un Zoológico

El zoológico deberá tener un nombre, una ubicación, un aforo máximo, un horario... ¡y todo lo que se te pueda ocurrir!

El zoológico deberá tener varias áreas:

- Reptiles
- Aves
- Mamíferos
- Peces

con distintos recintos, por ejemplo:

- Reptiles
	- Serpientes
	- Lagartos
- Aves
	- Aves pequeñas
	- Aves tropicales

	... etcétera

Cada recinto debe tener un nombre, una capacidad máxima de animales, aforo maximo de personas y un conjunto de animales.

Modeliza el zoológico lo más completo que puedas.

*/

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 120
	// COMPLETAR
};

zoo.ubicacion = {
	direccion: "Calle de los animales 5",
	ciudad: "París",
	pais: "Francia",
	// COMPLETAR
}

var area1 = {
	nombre: "Aves",
	aforoMaximoZona: 1000,
	recintos: [], // son como jaulas
	// COMPLETAR
}

var recinto1 = {
	nombre: "Mamiferos Gandes",
	aforoMaximoAnimales: 60,
	aforoMaximoPersonas: 50,
	animales: [],
	personas: []
}

var animal1 = {
	nombre: "Aguila bob",
	especie: "Aguila Americana",
	edad: 20,
	salud: 90,
	peso: "10K",
	alimentacion: "Carnivoro",
	color: "Negro"
}
function agregaRecinto(rNombre,rAforoMax,rAforoMin){

	var recinto = {
		nombre: "Mamiferos Gandes",
		aforoMaximoAnimales: 60,
		aforoMaximoPersonas: 50,
		animales: []
	}
	return recinto;
}
function agregaPersona(pNombre,pDNI,pPago,tipoDeEentrada){
	var persona={
		nombre: pNombre,
		DNI: pDNI,
		pago: pPago,
		tentrada:tipoDeEentrada
	}
	return persona;
}
function agregaAnimal(aNombre,aEspecie,aEdad,aSalud,aPeso,aAlimentacion,aColor){
	var animal = {
		nombre: aNombre,
		especie: aEspecie,
		edad: aEdad,
		salud: aSalud,
		peso: aPeso,
		alimentacion: aAlimentacion,
		color: aColor
	}
	return animal;
}




recinto1.animales.push(agregaAnimal('Oso Anteojo','Mamifero',100,10,'Omnivoro','Negro'));
recinto1.personas.push(agregaPersona('Daniel Aguilar','79954822',90,'Verde'));
area1.reciontos.push(agregaRecinto('Acuario',130,40));
area1.recintos.push(recinto1);
zoo.areas.push(area1);