
class Usuario{
	constructor(id,usuario,nombre,apellido,mail,password){
		this._id=id;
		this._usuario=usuario;
		this._nombre=nombre;
		this._apellido=apellido;
		this._mail=mail;
		this._password=password;
		this._recodar=0;
	}
}
class UserControler{
	constructor(api){
		this._baseUrl="http://formacion-indra-franlindebl.com/api/users";
		this._usuarioactivo=new Usuario();
		this._appClient=api;
	}
	realizarLogin(usuario,afuera){
		let completeUrl = this._baseUrl+"/login";
		if(afuera==1){
			this._usuarioactivo._usuario=usuario._usuario;
			this._usuarioactivo._password=usuario._password;
			this._usuarioactivo._recodar=usuario._recodar;
		}

		let dataApi = this.mapearJson(this._usuarioactivo,"login");
		let promise = this._appClient.post(completeUrl,dataApi).then((data)=>{
				let datos=data;
				this._usuarioactivo._id=data._id;
				this._usuarioactivo._nombre=data.nombre;
				this._usuarioactivo._apellido=data.apellidos;
				this._usuarioactivo._mail=data.email;
				if(this._usuarioactivo._recodar==true){
					localStorage.setItem('UsuarioLogado', JSON.stringify(this._usuarioactivo));
				}
				return data;
		})	
		.catch((data)=>{
			console.error("Fallo en Autticacion de usuario");
		});
		return promise;
	}
	verificarLogin(){
		let estado=false;
		var array = localStorage.getItem('UsuarioLogado');
		if(array){
			let objeto=JSON.parse(array);
			this._usuarioactivo._apellido=objeto._apellido
			this._usuarioactivo._id=objeto._id
			this._usuarioactivo._mail=objeto._mail
			this._usuarioactivo._nombre=objeto._nombre
			this._usuarioactivo._password=objeto._password
			this._usuarioactivo._recodar=objeto._recodar
			this._usuarioactivo._usuario=objeto._usuario
			this.realizarLogin();
			estado=true;
		}
		return estado
	}
	realizarLogout(){

	}
	crearUsuario(usuario){
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
	borrarUsuario(usuario){
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
	editarUsuario(usuario){
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
	mapearObjeto(data){
		let usuario= new Usuario(
					data._id,
					data.email,
					data.apellidos,
					data.nombre,
					data.username,
					data.password);
		return usuario;
	}

}