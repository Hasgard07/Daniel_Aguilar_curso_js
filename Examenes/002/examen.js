class Aleatorios{
	constructor(){

	}
	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

		return numero;
	}

	static saludAleatorio(){
		let salud=0;
		let indice = this.generarNumeroAleatorioEntre(0, 100);
		
		if(indice<10){
			salud=1
		}
		
		return salud;
	}
	static nombreAleatorio(){
		let nombres = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
		let indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

		return nombres[indice];
	}
	static nacionalidadAleatorio(){
		let nombres = ["Colombiano", "Uruguallo", "Argentino", "Mexicano", "Español", "italiano", "brasileno", "Aleman", "Japones", "Italiano", "Africano"];
		let indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

		return nombres[indice];
	}
	static posicionAleatorio(){
		let nombres = ["Portero", "Atacante", "Defensa", "Medio"];
		let indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

		return nombres[indice];
	}
	static ordenarObjetos(arrToSort , strObjParamToSortBy, sortAscending) {
	    if(sortAscending == undefined) sortAscending = true; 
	    
	    if(sortAscending) {
	        arrToSort.sort(function (a, b) {
	            return a[strObjParamToSortBy] > b[strObjParamToSortBy];
	        });
	    }
	    else {
	        arrToSort.sort(function (a, b) {
	            return a[strObjParamToSortBy] < b[strObjParamToSortBy];
	        });
   		}
	}
}
/*1) Realiza la clase Soldado que tenga lo siguientes atributos:

	- Nombre (aleatorio)
	- Salud (100)
	- Potencia de ataque (0)

Y los siguientes métodos:

	- Ataca(soldado) -> Recibirá un soldado y le quitará salud (la potencia de ataque que tenga).

(si, igual que en los vikingos :P)*/
class Soldado{
	constructor(){
		this._Nombre=Aleatorios.nombreAleatorio();
		this._Salud=100;
		this._ataque=0;

	}
	ataca(enemigo){
		this._Salud=this._Salud-enemigo._ataque;
	}
}
/*2) Realiza las siguientes clases:

SoldadoDeInfanteria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 1-25)


SoldadoDeCaballeria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 25-50)


SoldadoDeArtilleria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 50-75)


SoldadoPilotoF18 que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 75-100)*/
class SoldadoDeInfanteria extends Soldado{
	constructor(){
		super();
		this._ataque=Aleatorios.generarNumeroAleatorioEntre(1,25);
	}
}
class SoldadoDeCaballeria extends Soldado{
	constructor(){
		super();
		this._ataque=Aleatorios.generarNumeroAleatorioEntre(25,50);
	}
}
class SoldadoDeArtilleria extends Soldado{
	constructor(){
		super();
		this._ataque=Aleatorios.generarNumeroAleatorioEntre(50,75);
	}
}
class SoldadoPilotoF18 extends Soldado{
	constructor(){
		super();
		this._ataque=Aleatorios.generarNumeroAleatorioEntre(75,100);
	}
}
/*
3) Realiza la clase Ejercito con los siguientes atributos:

	- Pais (aleatorio)
	- Soldados (array)
	- Bajas (array)

En su creación la clase Ejercito generará 1000 soldados:
	500 de Infanteria
	200 de Caballeria
	200 de Artillería
	100 pilotos de F18
	*/
class Ejercito{
	
	constructor(){
		this._pais=Aleatorios.nacionalidadAleatorio();
		this._Soldados=[];
		this._bajas=[];
		this.generarEjercito();
	}
	generarEjercito(){
		for (let i=0;i<500;i++){
			let soldadoDeInfanteria= new SoldadoDeInfanteria();
			this._Soldados.push(soldadoDeInfanteria);
		}
		for (let i=0;i<200;i++){
			let soldadoDeCaballeria= new SoldadoDeCaballeria();
			this._Soldados.push(soldadoDeCaballeria);
		}
		for (let i=0;i<200;i++){
			let soldadoDeArtilleria= new SoldadoDeArtilleria();
			this._Soldados.push(soldadoDeArtilleria);
		}
		for (let i=0;i<100;i++){
			let soldadoPilotoF18= new SoldadoPilotoF18();
			this._Soldados.push(soldadoPilotoF18);
		}
	}

}
/*4) Realiza la clase Guerra, que recibirá dos ejercitos en su construcción.

La clase guerra deberá tener los siguientes atributos:
	- Numero de jornadas transcurridas: 0
	- Ejercito 1
	- Ejericto 2

La clase guerra deberá tener los métodos:
	- Iniciar guerra -> hará que empiecen a ejecutarse jornadas de manera consecutiva 
		(1 jornada cada 1000ms hasta que uno de los ejercitos se quede sin soldados)

	- Ejecutar jornada de guerra: en cada jornada de la guerra cada soldado de cada ejercito atacará a un soldado del ejercito contrario. 
		La elección del soldado al que atacará puede ser aleatoria
		Si un soldado muere (salud<=0) pasará al array de bajas de su ejército, y saldrá del array de soldados
		No importa qué ejercito empiece atacando.
		
	- Imprimir estado:
		Será ejecutado en cada jornada de la guerra y mostrará en la consola:
			- Numero de jornadas ejecutadas
			- Numero de soldados vivos en ejercito 1
			- Numero de soldado vivos en ejercito 2
			- Bajas ejército 1
			- Bajas ejército 2

*/
class Guerra{
	constructor(){
		this.ejercito1=new Ejercito();
		this.ejercito2=new Ejercito();
	}
}
ejercito1= new Ejercito();