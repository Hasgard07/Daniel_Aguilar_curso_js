class Aleatorios{
	constructor(){

	}
	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

		return numero;
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
		this._salud=100;
		this._ataque=0;

	}
	ataca(enemigo){
		this._salud=this._salud-enemigo._ataque;
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
		this._soldados=[];
		this._bajas=[];
		this.generarEjercito();
	}
	generarEjercito(){
		for (let i=0;i<500;i++){
			let soldadoDeInfanteria= new SoldadoDeInfanteria();
			this._soldados.push(soldadoDeInfanteria);
		}
		for (let i=0;i<200;i++){
			let soldadoDeCaballeria= new SoldadoDeCaballeria();
			this._soldados.push(soldadoDeCaballeria);
		}
		for (let i=0;i<200;i++){
			let soldadoDeArtilleria= new SoldadoDeArtilleria();
			this._soldados.push(soldadoDeArtilleria);
		}
		for (let i=0;i<100;i++){
			let soldadoPilotoF18= new SoldadoPilotoF18();
			this._soldados.push(soldadoPilotoF18);
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
		this._ejercito1=new Ejercito();
		this._ejercito2=new Ejercito();
		this._rondas=0;
		this.iniciarGerra()
	}
	iniciarGerra(){
		let guerra = this;
		let turno =Aleatorios.generarNumeroAleatorioEntre(0,1);
		let idserinterval = setInterval(function(){guerra.ejecutarJornada(idserinterval,turno)}, 1000);
		//this.ejecutarJornada();

	}
	ejecutarJornada(ciclo,empieza)
	{
		this._rondas=this._rondas+1;
		if(empieza==1){
			if(this._ejercito2._soldados.length!=0)
			{
				for(let i=0;i<this._ejercito1._soldados.length;i++){
					let soldadosVivos=this._ejercito2._soldados.length-1;
					let soldadoAtacante=Aleatorios.generarNumeroAleatorioEntre(0,soldadosVivos)
					this._ejercito1._soldados[i].ataca(this._ejercito2._soldados[soldadoAtacante]);
					if(this._ejercito1._soldados[i]._salud<=0){
						this._ejercito1._soldados[i]._salud=0;
						this._ejercito1._bajas.push(this._ejercito1._soldados[i]);
						this._ejercito1._soldados.splice(i,1);
					}

				}
			}
			if(this._ejercito1._soldados.length==0){
			console.log("ha ganado el Ejecito2");
			this.imprimirEstado();
			clearInterval(ciclo);

			}
			if(this._ejercito1._soldados.length!=0)
			{
				for(let i=0;i<this._ejercito2._soldados.length;i++){
					let soldadosVivos=this._ejercito1._soldados.length-1;
					let soldadoAtacante=Aleatorios.generarNumeroAleatorioEntre(0,soldadosVivos)
					this._ejercito2._soldados[i].ataca(this._ejercito1._soldados[soldadoAtacante]);
					if(this._ejercito2._soldados[i]._salud<=0){
						this._ejercito2._soldados[i]._salud=0;
						this._ejercito2._bajas.push(this._ejercito2._soldados[i]);
						this._ejercito2._soldados.splice(i,1);
					}
				}
			}
			if(this._ejercito2._soldados.length==0){
				console.log("ha ganado el Ejecito1");
				this.imprimirEstado();
				clearInterval(ciclo);
			}
		}
		else{

			if(this._ejercito1._soldados.length!=0)
			{
				for(let i=0;i<this._ejercito2._soldados.length;i++){
					let soldadosVivos=this._ejercito1._soldados.length-1;
					let soldadoAtacante=Aleatorios.generarNumeroAleatorioEntre(0,soldadosVivos)
					this._ejercito2._soldados[i].ataca(this._ejercito1._soldados[soldadoAtacante]);
					if(this._ejercito2._soldados[i]._salud<=0){
						this._ejercito2._soldados[i]._salud=0;
						this._ejercito2._bajas.push(this._ejercito2._soldados[i]);
						this._ejercito2._soldados.splice(i,1);
					}
				}
			}
			if(this._ejercito2._soldados.length==0){
				console.log("ha ganado el Ejecito1");
				this.imprimirEstado();
				clearInterval(ciclo);
			}
			if(this._ejercito2._soldados.length!=0)
			{
				for(let i=0;i<this._ejercito1._soldados.length;i++){
					let soldadosVivos=this._ejercito2._soldados.length-1;
					let soldadoAtacante=Aleatorios.generarNumeroAleatorioEntre(0,soldadosVivos)
					this._ejercito1._soldados[i].ataca(this._ejercito2._soldados[soldadoAtacante]);
					if(this._ejercito1._soldados[i]._salud<=0){
						this._ejercito1._soldados[i]._salud=0;
						this._ejercito1._bajas.push(this._ejercito1._soldados[i]);
						this._ejercito1._soldados.splice(i,1);
					}

				}
			}
			if(this._ejercito1._soldados.length==0){
			console.log("ha ganado el Ejecito2");
			this.imprimirEstado();
			clearInterval(ciclo);

			}
		}

	}
	imprimirEstado(){
		let soldadosVivosEjecito1=this._ejercito1._soldados.length;
		let soldadosVivosEjecito2=this._ejercito2._soldados.length;
		let bajasEjercito1=this._ejercito1._bajas.length;
		let bajasEjercito2=this._ejercito2._bajas.length;
		console.log("Numero de jornadas ejecutadas: "+this._rondas);
		console.log("Numero de soldados vivos en ejercito 1: "+soldadosVivosEjecito1);
		console.log("Numero de soldados vivos en ejercito 2: "+soldadosVivosEjecito2);
		console.log("Bajas ejército 1: "+bajasEjercito1);
		console.log("Bajas ejército 2: "+bajasEjercito2);
	}
}
let guerra= new Guerra();
