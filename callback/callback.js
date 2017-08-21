//callback//
/*function generarNumeroAleatorioEntre(minimo, maximo, myCallBack){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	myCallBack(numero);

	return numero;
}
var myCallBack=function(numAleatorio){
	console.log("He acabado de generar el numero: "+numAleatorio);
}
var numAleatorio=generarNumeroAleatorioEntre(0,100,myCallBack);*/
//peticiones http
/*var peticionDeListadoDeUsersHaCambiado = function(event){
	var objetoQueHaHechoLaPeticion = event.target;

	if(objetoQueHaHechoLaPeticion.readyState == 4){
		console.log("Ha terminado la petición HTTP");

		if(objetoQueHaHechoLaPeticion.status == 200){
			var reponseObject = JSON.parse(objetoQueHaHechoLaPeticion.responseText);
			tratamientoDeUsuarios(reponseObject);
		}
	}
}

var peticionDeFollowersHaCambiado = function(event){
	var objetoQueHaHechoLaPeticion = event.target;

	if(objetoQueHaHechoLaPeticion.readyState == 4){
		console.log("Ha terminado la petición HTTP");

		if(objetoQueHaHechoLaPeticion.status == 200){
			var reponseObject = JSON.parse(objetoQueHaHechoLaPeticion.responseText);
			console.log("Los followers son:");
			console.log(reponseObject);
		}
	}
} 

var tratamientoDeUsuarios = function(usuarios){
	var primerUsuario = usuarios[0];
	var nombrePrimerUsuario = primerUsuario.login;
	var urlFollowersPrimerUsuario = primerUsuario.followers_url;

	console.log(nombrePrimerUsuario);
	console.log(urlFollowersPrimerUsuario);

	var peticionObject = new XMLHttpRequest();

	peticionObject.onreadystatechange = peticionDeFollowersHaCambiado;
	peticionObject.open("GET", urlFollowersPrimerUsuario);
	peticionObject.send();
}

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = peticionDeListadoDeUsersHaCambiado;
xhr.open("GET", "https://api.github.com/users");
xhr.send();
//refactorizado
var callbackPeticionHaCambiado = function(event, miCallback) {
    var objetoQueHaHechoLaPeticion = event.target;

    if (objetoQueHaHechoLaPeticion.readyState == 4) {
        console.log("Ha terminado la petición HTTP");

        if (objetoQueHaHechoLaPeticion.status == 200) {
            var reponseObject = JSON.parse(objetoQueHaHechoLaPeticion.responseText);
            miCallback(reponseObject);
        }
    }
}
*/
var callbackPeticionHaCambiado = function(event, miCallback) {
    var objetoQueHaHechoLaPeticion = event.target;

    if (objetoQueHaHechoLaPeticion.readyState == 4) {
        console.log("Ha terminado la petición HTTP");

        if (objetoQueHaHechoLaPeticion.status == 200) {
            var reponseObject = JSON.parse(objetoQueHaHechoLaPeticion.responseText);
            miCallback(reponseObject);
        }
    }
}

// Recibe el listado de users
var tratamientoDeUsuarios = function(usuarios) {
    var primerUsuario = usuarios[0];
    var urlFollowersPrimerUsuario = primerUsuario.followers_url;
    realizaPeticionDeListadoFollowers(urlFollowersPrimerUsuario);
}

// Recibe el listado de followers
var tratamientoDeFollowers = function(followers) {
    console.log("Los followers son:");
    console.log(followers);
}

// Realiza petición del listado de users
var realizarPeticionDeUsers = function() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(event){
    	callbackPeticionHaCambiado(event, tratamientoDeUsuarios);
    };

    xhr.open("GET", "https://api.github.com/users");
    xhr.send();
}

// Realiza petición del listado de followers
var realizaPeticionDeListadoFollowers = function(urlFollowers) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(event){
    	callbackPeticionHaCambiado(event, tratamientoDeFollowers);
    };

    xhr.open("GET", urlFollowers);
    xhr.send();
}

// Hago la llamada
realizarPeticionDeUsers();