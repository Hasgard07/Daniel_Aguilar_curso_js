class ClienteComida{
	constructor(api){
		this._baseUrl="http://formacion-indra-franlindebl.com/api/comidas";
		this._appClient=api;
	}
	getComida(){
		let completeUrl = this._baseUrl;
		let dataApi = "";
		let promise = this._appClient.get(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al traer data Comida");
		});
		return promise;
	}

}