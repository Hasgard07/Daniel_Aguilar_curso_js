/*

Ejercicio 002__003

Xanxo Whatsapp

Partiendo de los ficheros entregados...

Orquesta la comunicación entre los dos iPhones

Los mensajes que envíe el iphone1 llegarán al iphone2 y viceversa.

No olvides pintar también los mensajes enviados por el propio usuario.

Para pintar dispones de la función pintarMensaje(idIphone, mensaje, esPropio) 

Para obtener el mensaje que ha escrito un usuario dispones de la función getMensaje(idIphone) 

*/
class Telefono{
	constructor(id,pubsub){
		this._id = id;
		this._pubsub = pubsub;
		this.mensajes=[];
		this.suscribirse();
		this.agregarEvento();
	}
	agregarEvento(){
		let capa="#button-"+ this._id;
		let button = document.querySelector(capa);
		button.addEventListener("click", () => this.enviarMensaje());
	}
	enviarMensaje(){
		let capa='#'+ this._id;
		let componetesIphone = document.body.querySelector(capa);
		let textComponente = componetesIphone.querySelector("textarea");
		let mensaje= textComponente.value;
		let destinoComponente = componetesIphone.querySelector("select");
		let destino = destinoComponente.value;
		let mensajeEniviar = new Mensaje(mensaje,this._id,destino);
		this.publicaMensaje(mensajeEniviar);

	}
	suscribirse(){
		this._pubsub.sub("TODOS",(objeto)=>this.pintarMensaje(objeto));
		this._pubsub.sub(this._id,(objeto)=>this.pintarMensaje(objeto));
	}
	publicaMensaje(objeto){
		this._pubsub.pub(objeto._destino,objeto);
	}
	pintarMensaje(objeto){
		console.log(objeto);
		let idIphone=objeto._destino;
		let mensaje=objeto._texto;
		let nombreUsuario=objeto._origen;
		let selector = "#" + this._id + " " + ".messages";
    	let misMensajes = document.querySelector(selector);

    	let elementMessage = document.createElement("div");

    	if (objeto._destino == objeto._origen || this._id == objeto._origen) {
       	 	elementMessage.className = "message messageOwn";
    	} else {
        	elementMessage.className = "message";

        // Como no es propio, ponemos nombre de usuario
       		let elementUserName = document.createElement("div");
        	elementUserName.className = "message__username";
        	elementUserName.innerHTML = nombreUsuario;

        // Coloco el nombre de usuario dentro del mensaje
        	elementMessage.insertBefore(elementUserName, null);
   		}

    // Como no es propio, ponemos nombre de usuario
    	let elementText = document.createElement("div");
    	elementText.className = "message__text";
    	elementText.innerHTML = mensaje;

    // Coloco el nombre de usuario dentro del mensaje
    	elementMessage.insertBefore(elementText, null);

    // Inserto el mensaje
    	misMensajes.insertBefore(elementMessage, null);
	}
}
class Mensaje{
	constructor(mensaje,origen,destino){
		this._texto = mensaje;
		this._origen = origen;
		this._destino = destino;
	}
}
class MainControler{
	constructor(){
		this._pubsub = new PubSub();
		this._mensaje = "null"
		this._telefono1 = new Telefono("iphone1",this._pubsub);
		this._telefono2 = new Telefono("iphone2",this._pubsub);
		this._telefono3 = new Telefono("iphone3",this._pubsub);
		this._telefono4 = new Telefono("iphone4",this._pubsub);
	}

}
window.onload = () => {
	let mvc = new MainControler();
}