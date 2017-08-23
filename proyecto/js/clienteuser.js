
class ClienteUser{
	constructor(api){
		this._baseUrl="http://formacion-indra-franlindebl.com/api/users";
	
		this._appClient=api;
	}
	autenticarUsuario(usuario){
		let completeUrl = this._baseUrl+"/login";
		let dataApi = this.mapearJson(usuario,"login");
		let promise = this._appClient.post(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo en Autticacion de usuario");
		});
		return promise;
	}
	createUsuario(usuario){
		let completeUrl = this._baseUrl;
		let dataApi = this.mapearJson(usuario,"crear");
		let promise = this._appClient.post(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo en creacion de usuario");
		});
		return promise;
	}
	deleteUsuario(usuario){
		let completeUrl = this._baseUrl+"/"+usuario._id;
		let dataApi = this.mapearJson(usuario,"delete");
		let promise = this._appClient.delete(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al Borrar el usuario");
		});
		return promise;
	}
	editUsuario(usuario){
		let completeUrl = this._baseUrl+"/"+usuario._id;
		let dataApi = this.mapearJson(usuario,"crear");
		let promise = this._appClient.put(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al editar el usuario");
		});
		return promise;
	}
	mapearJson(data,proceso){
		let dataApi=null;
		if(proceso=="crear"){
			dataApi={
					email:data._mail,
					apellidos:data._apellido,
					nombre:data._nombre,
					username:data._usuario,
					password:data._password

			};
		}
		if(proceso=="login"){
			dataApi={
				username:data._usuario,
				password:data._password
			};
		}
		if(proceso=="delete"){
			dataApi={
				password:data._password
			};
		}
		return dataApi;
	}
}