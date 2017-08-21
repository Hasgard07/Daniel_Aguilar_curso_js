class PostClient{
	constructor(appClient){
		this._baseUrl="https://jsonplaceholder.typicode.com/posts?userId=";
		this._appClient=appClient;

	}
	getAllPost(id){
		let completeUrl = this._baseUrl+id;
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
		let post = new Post(
					data.userId,
					data.id,
					data.title,
					data.body
					);
		return post;
	}
}