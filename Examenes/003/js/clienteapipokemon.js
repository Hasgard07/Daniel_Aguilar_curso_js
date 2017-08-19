class PokemonApiClient{
	constructor(appClient){
		this._baseUrl="http://pokeapi.co/api/v2/pokemon/?offset=";
		this._appClient=appClient;

	}
	//este Metodo  devuelve una promesa
	//que resuelve on un array de objetos SuperHeroes
	getPokemonPagina(pagina,pokedex){
		let contador=pagina;
		if(pagina!=0){
			contador=pagina*20;
		}
		let completeUrl = this._baseUrl+contador;
		let promise = this._appClient.get(completeUrl,null);
		let anotherPromise=promise.then((data)=>{
		let	pokemons=[];
			pokedex._numeroTotal=data.count;
			for(let i=0;i<data.results.length;i++){
				let pokemon= this.mapearObjeto(data.results[i])
					pokemons.push(pokemon);
			}
			return pokemons;
		});
		return anotherPromise;
	}
	getPokemonUrl(url){
		let completeUrl = url;
		let promise = this._appClient.get(completeUrl,null);
		let anotherPromise=promise.then((data,)=>{
			let pokemon= this.mapearObjetoUrl(data);

			return pokemon;
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
		let pokemon = new Pokemon(
					data.name,
					data.url
					);
		return pokemon;
	}
	mapearObjetoUrl(data){
		let pokemon = new Pokemon(
					data.name,
					data.url,
					data.sprites.front_default,
					data.weight,
					data.height
					);
		return pokemon;
	}
}
