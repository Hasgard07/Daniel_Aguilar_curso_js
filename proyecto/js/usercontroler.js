
class Usuario{
	constructor(){
		this._id="";
		this._usuario="";
		this._nombre="";
		this._apellido="";
		this._mail="";
		this._password="";
		this._recodar=0;
	}
}
class UserControler{
	constructor(clienteApiUser){
		this._clienteApiUser=clienteApiUser;
		this._estado=0;
		this._usuarioactivo=new Usuario();

	}
	realizarLogin(){
		let retorno=0;
		let promise
		promise=this._clienteApiUser.autenticarUsuario(this._usuarioactivo).then((response)=>{
			retorno=response;
			if(response._id){
				this._usuarioactivo._id=response._id;
				this._usuarioactivo._nombre=response.nombre;
				this._usuarioactivo._apellido=response.apellidos;
				this._usuarioactivo._mail=response.email;
				if(this._usuarioactivo._recodar==true)
				localStorage.setItem('UsuarioLogado', JSON.stringify(this._usuarioactivo));
			}
			return retorno;
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
	crearUsuario(user){
		let retorno=0;
		let promise
		promise=this._clienteApiUser.createUsuario(user).then((response)=>{
			retorno=response.code;
			return retorno;
		});
		return promise;
	}
	borrarUsuario(){
		let retorno=0;
		let promise
		promise=this._clienteApiUser.deleteUsuario(this._usuarioactivo).then((response)=>{
			retorno=response;
			return retorno;
		});
		return promise;

	}
	editarUsuario(){
		let retorno=0;
		let promise
		promise=this._clienteApiUser.editUsuario(this._usuarioactivo).then((response)=>{
			retorno=response.code;
			return retorno;
		});
		return promise;
	}
}