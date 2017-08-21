/*

1) Haciendo uso de funciones y new, realiza una "clase" Vikingo que almacene la información de un vikingo:

nombre
salud (0 - 1000)
potenciaAtaque (1 - 20)
valocidad (0 - 100)

2) Haz uso de prototype y añade un método .ataca(vikingo) a un vikingo para que ataque a su oponente.
el ataque quitara salud al vikingo atacado (la potencia de ataque del atacante)

3) Realiza una clase Batalla() que en su creación reciba dos vikingos.

Batalla tendrá un método iniciarPelea que realizará la pelea entre ambos vikingos.

Una batalla tendrá una serie de asaltos en los que:

atacará primero el que más valocidad tenga,
y quitará de salud al rival su potencia de ataque,
hasta que uno de los dos muera. (salud <= 0)

4) Crear la clase Arma() tenga un tipo: (espada/cuchillo...etc), una potencia (20 - 50) y un ataquesRestantes (0 -10).

5) Añade una propiedad armas a Vikingo para que pueda poseer varias armaspara su batalla.
Añade el método addArma() para añadir armas a los vikingos,

6) Modifica la función ataca del vikingo, para que si tiene armas disponibles ataque con el arma más potente.
Cada vez que se use un arma, debera restar uno a ataquesRestantes de ese arma.
Cuando el arma tenga 0 ataquesRestantes, el vikingo deberá abandonar el arma (añade la función abandonarArma al vikingo).


*/

//Funciones generales
function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}
function nombreAleatorio(){
	var nombres = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = generarNumeroAleatorioEntre(0, nombres.length-1);

	return nombres[indice];
}
function nombreArmaAleatorio(){
	var armas = ["Fusil", "Pistola", "Cuchillo", "Lanza", "Espada", "Ametralladora"];
	var indice = generarNumeroAleatorioEntre(0, armas.length-1);

	return armas[indice];
}
function Vikingo(){
	this._nombre = nombreAleatorio();
	this._salud=100;
	this._potenciaAtaque=generarNumeroAleatorioEntre(1,20);
	this._velocidad=generarNumeroAleatorioEntre(0,100);
	this._armas=[];
};
Vikingo.prototype.eliminarArma=function(eliminar){

		this._armas.splice[eliminar,1]
}
Vikingo.prototype.revisarSiMurio=function(){
	var estado=false;
	if(this._salud<=0){
		this._salud=0;
		estado=true;
		console.log("el Vikingo: "+this._nombre+" Murio");
	}
	return estado;
}
Vikingo.prototype.revisarArmas=function(){
	var cantidadArmas=this._armas.length-1;
	for(indiceArmas=0;indiceArmas<=cantidadArmas;indiceArmas++){
		if(this._armas[indiceArmas]._ataquesRetantes<=0){
			this.eliminarArma(indiceArmas);
		}
	}
}
Vikingo.prototype.ataca=function(vikingoDos, turno){
	var castigo1=0;
	var castigo2=0;
	var estadoa=false;
	this.revisarArmas();
	vikingoDos.revisarArmas();
	armaViquingo1=this.armaEmpunada();
	armaViquingo2=vikingoDos.armaEmpunada();
	castigo1=this._armas[armaViquingo1]._potenciaAtaque;
	this._armas[armaViquingo1]._ataquesRetantes=this._armas[armaViquingo1]._ataquesRetantes-1;
	castigo2=vikingoDos._armas[armaViquingo2]._potenciaAtaque;
	vikingoDos._armas[armaViquingo2]._ataquesRetantes=vikingoDos._armas[armaViquingo2]._ataquesRetantes-1;
	
	if(turno==1){
		vikingoDos._salud=vikingoDos._salud-castigo1;
		estado=vikingoDos.revisarSiMurio();
		if(estado==false){
			this._salud=this._salud-castigo2;
			estado=this.revisarSiMurio();
		}
	}
	else{
		this._salud=this._salud-castigo2;
		estado=this.revisarSiMurio();
		if(estado==false){
			vikingoDos._salud=vikingoDos._salud-castigo1;
			estado=vikingoDos.revisarSiMurio();
		}
	}
	return estado;
}
Vikingo.prototype.armaEmpunada=function(){

	var cantidadArmas=0;
	var armaMasPotente=0;
	cantidadArmas=this._armas.length-1
	var potenciaMasAlta=0;
	var potenciaSiguiente=0;
	potenciaMasAlta=this._armas[0]._potenciaAtaque;
	for(indiceArmas=0;indiceArmas<=cantidadArmas;indiceArmas++){
		potenciaSiguiente=this._armas[indiceArmas]._potenciaAtaque
		if(potenciaMasAlta<potenciaSiguiente && this._armas[indiceArmas]._ataquesRetantes>0){
			armaMasPotente=indiceArmas;
		}
	}
	return armaMasPotente;
}
		
Vikingo.prototype.addArma=function(){
	var armaNueva=null;
	NumeroDeArmas=generarNumeroAleatorioEntre(0,6);
	for(var indiceArmas=0;indiceArmas<=NumeroDeArmas;indiceArmas++){

		armaNueva=new Arma();
		this._armas.push(armaNueva);
	}
}

function Batalla(vikingoUno,vikingoDos){
	this._adversario1=vikingoUno;
	this._adversario2=vikingoDos;
}
Batalla.prototype.iniciarPelea=function(){
	var estado=false;
	var velocidad1=this._adversario1._velocidad;
	this._adversario1.addArma();
	var velocidad2=this._adversario2._velocidad;
	this._adversario2.addArma();
	var turno=0;
	if(velocidad1>velocidad2){
		turno=1
	}

	while(estado==false){
		estado=this._adversario1.ataca(this._adversario2,turno);
			
		if(turno==1){
			turno=0;
		}
		else{
			turno=1;
		}
	}
	
	
}
function Arma(){
	this._nombre = nombreArmaAleatorio();
	this._potenciaAtaque=generarNumeroAleatorioEntre(20,50);
	this._ataquesRetantes=generarNumeroAleatorioEntre(0,10);
	this._arma=nombreArmaAleatorio();
}
vikingoA=new Vikingo();
vikingoB=new Vikingo();
batallaNueva= new Batalla(vikingoA,vikingoB);
batallaNueva.iniciarPelea();