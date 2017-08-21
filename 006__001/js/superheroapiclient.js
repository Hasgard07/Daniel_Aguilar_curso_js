class SuperHeroClient{
	constructor(appClient){
		this._baseUrl="http://pokeapi.co/api/v2/pokemon/?offset=";
		this._appClient=appClient;

	}
	//este Metodo  devuelve una promesa
	//que resuelve on un array de objetos SuperHeroes
	getAllSuperHeroes(){
		let completeUrl = this._baseUrl;
		let promise = this._appClient.get(completeUrl,null);
		let anotherPromise=promise.then((data)=>{
		let	superHeroes=[];
			for(let i=0;i<data.length;i++){
				let superHeroe= this.mapearObjeto(data[i])
					superHeroes.push(superHeroe);
			}

			return superHeroes;
		});
		return anotherPromise;
	}
	createSuperHeroes(superHeroe){
		let completeUrl = this._baseUrl;
		let dataApi = this.mapearJson(superHeroe);
		let promise = this._appClient.post(completeUrl,dataApi)
			.then((data)=>{
			console.log("NO HA FALLADO AL CREAR ITEM: ");
		})	
		.catch((data)=>{
			console.error("HA FALLADO");
		});
		return promise;
	}
	editSuperHeroes(superHeroe){
		let completeUrl = this._baseUrl+'/'+superHeroe._identificador;
		let dataApi = this.mapearJson(superHeroe);
		let promise = this._appClient.put(completeUrl,dataApi)
			.then((data)=>{
			console.log("NO HA FALLADO EDITAR ITEM: "+superHeroe._identificador);
		})	
		.catch((data)=>{
			console.error("HA FALLADO");
		});
		return promise;
	}
	deleteSuperHeroes(id){
		let completeUrl = this._baseUrl+'/'+id;
		let promise = this._appClient.delete(completeUrl,null)
			.then((data)=>{
			console.log("NO HA FALLADO BORRADO ITEM: "+id);
			console.log(data);
		})
		.catch((data)=>{
			console.error("HA FALLADO");

		});
		return promise;
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
		let superHeroe= new SuperHeroe(
					data.id,
					data.name,
					data.weapon,
					data.occupation,
					data.debt);
		return superHeroe;
	}

}