
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
class Persona{
	constructor(){
		this._nombre=Aleatorios.nombreAleatorio();
		this._edad=Aleatorios.generarNumeroAleatorioEntre(18,30);
		this._nacionalidad= Aleatorios.nacionalidadAleatorio();
		this._altura=Aleatorios.generarNumeroAleatorioEntre(150,210);
		this._peso=Aleatorios.generarNumeroAleatorioEntre(60,110);
		this._Enfermo=Aleatorios.saludAleatorio();
	}
}

class Jugador extends Persona{

	constructor(){
		super();
		this._posición=Aleatorios.posicionAleatorio();
		this._numero=Aleatorios.generarNumeroAleatorioEntre(1,22);
		this._calidad=Aleatorios.generarNumeroAleatorioEntre(1,100);
	}

}

class Entrenador extends Persona{

	constructor(){
		super();
		this._plantilla=[];
	}
	elegirPlantillaParaPartido(){
		let potencia=0;
	}

	mejoresJugadores(equipo,formacion){
		let mejoresP=[];
		let mejoresD=[];
		let mejoresM=[];
		let mejoresA=[];
		for(let indiceJugadores=0;indiceJugadores<22;indiceJugadores++)
		{

			if(equipo._jugadores[indiceJugadores]._posición=="Portero"){
				mejoresP.push(equipo._jugadores[indiceJugadores]);
			}
			if(equipo._jugadores[indiceJugadores]._posición=="Defensa"){
				mejoresD.push(equipo._jugadores[indiceJugadores]);
			}
			if(equipo._jugadores[indiceJugadores]._posición=="Medio"){
				mejoresM.push(equipo._jugadores[indiceJugadores]);
			}
			if(equipo._jugadores[indiceJugadores]._posición=="Atacante"){
				mejoresA.push(equipo._jugadores[indiceJugadores]);
			}
		}
		
		Aleatorios.ordenarObjetos(mejoresP, "_calidad",false);
		Aleatorios.ordenarObjetos(mejoresD, "_calidad",false);
		Aleatorios.ordenarObjetos(mejoresM, "_calidad",false);
		Aleatorios.ordenarObjetos(mejoresA, "_calidad",false);
		//mejores porteros
		if(mejoresP.length>0){
			equipo._titulares.push(mejoresP[0]);
			mejoresP.splice(0,1);
			for(let indicePorteros=mejoresP.length-1;indicePorteros>=0;indicePorteros--){
				equipo._banco.push(mejoresP[indicePorteros]);
			}
		}
		//mejores defensas
		if(mejoresD.length>0){
			let cantidadElementos=mejoresD.length;
			for(let indice=0;indice<=cantidadElementos-1;indice++){
				if(indice<formacion[0]){
					equipo._titulares.push(mejoresD[indice]);
					mejoresD.splice(indice,1);

				}

				
			}
			if(mejoresA.length>0){
				for(let indiceBanca = mejoresD.length-1; indiceBanca>=0 ; indiceBanca--){
					equipo._banco.push(mejoresD[indiceBanca]);
				}
			}
		}
		//mejores Medios
		if(mejoresM.length>0){
			let cantidadElementos=mejoresM.length;
			for(let indice=0;indice<=cantidadElementos-1;indice++){
				if(indice<formacion[1]){
					equipo._titulares.push(mejoresM[indice]);
					mejoresM.splice(indice,1);
				}

			}
			if(mejoresA.length>0){
				for(let indiceBanca = mejoresM.length-1; indiceBanca>=0 ; indiceBanca--){
					equipo._banco.push(mejoresM[indiceBanca]);
				}
			}
		}
		
		//mejores Atacantes
		if(mejoresA.length>0){
			let cantidadElementos=mejoresA.length;
			for(let indice=0;indice<=cantidadElementos-1;indice++){
				if(cantidadElementos<formacion[2]){
					equipo._titulares.push(mejoresA[indice]);
					mejoresA.splice(indice,1);

				}

			}
			if(mejoresA.length>0){
				for(let indiceBanca = mejoresA.length-1; indiceBanca>=0 ; indiceBanca--){
					equipo._banco.push(mejoresA[indiceBanca]);
				}
			}
		
		}


	}
	
}
class Equipo{

	constructor(){
		this._jugadores=[];
		this._banco=[]
		this._titulares=[];
		this._entrenador= new Entrenador();
		this.cargarequipo();


	}
	cargarequipo(){
			for(let indiceJugadores=0;indiceJugadores<22;indiceJugadores++)
			{
				this._jugadores.push(new Jugador());
			}
	}

}

let equipo1= new Equipo();
let equipo2= new Equipo();
let formacion=[4,4,2];
debugger;
equipo1._entrenador.mejoresJugadores(equipo1,formacion);