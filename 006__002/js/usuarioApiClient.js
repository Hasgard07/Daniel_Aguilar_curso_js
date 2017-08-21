class UsarioClient{
	constructor(appClient){
		this._baseUrl="https://jsonplaceholder.typicode.com/users";
		this._appClient=appClient;

	}
	getAllUsuarios(){
		let completeUrl = this._baseUrl;
		let promise = this._appClient.get(completeUrl,null);
		let anotherPromise=promise.then((data)=>{
		let	usuarios=[];
			for(let i=0;i<data.length;i++){
				let usuario= this.mapearObjeto(data[i])
					usuarios.push(usuario);
			}

			return usuarios;
		});
		return anotherPromise;
	}
	mapearJson(data){
		let dataApi={
			id:data._identificador,
			name:data._apodo,
			weapon:data._arma,
			occupation:data._trabajo,
			debt:data._deuda
		};
		return dataApi;
	}
	mapearObjeto(data){
		let user = new Usuario(
					data.id,
					data.name,
					data.username,
					data.email,
					data.phone,
					data.website);
		return user;
	}
}