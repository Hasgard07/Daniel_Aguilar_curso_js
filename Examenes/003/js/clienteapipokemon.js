class PokemonApiClient{
	constructor(appClient){
		this._baseUrl="http://pokeapi.co/api/v2/pokemon/?offset=";
		this._appClient=appClient;

	}
	//este Metodo  devuelve una promesa
	//que resuelve on un array de objetos SuperHeroes
	getPokemonPagina(pagina){
		let completeUrl = this._baseUrl+pagina;
		let promise = this._appClient.get(completeUrl,null);
		let anotherPromise=promise.then((data)=>{
		let	pokemons=[];
			for(let i=0;i<data.results.length;i++){
				let pokemon= this.mapearObjeto(data.results[i])
					pokemons.push(pokemon);
			}
			return pokemons;
		});
		return anotherPromise;
	}
	getPokemonUrl(pokemon){
		let completeUrl = pokemon._urlDetalle;
		let promise = this._appClient.get(completeUrl,null);
		let anotherPromise=promise.then((data)=>{
		let	pokemons=[];
				//falta mapear los campos del pokemon
				pokemon= this.mapearObjeto(data.)
					pokemons.push(pokemon);
			}
			return pokemons;
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
}
