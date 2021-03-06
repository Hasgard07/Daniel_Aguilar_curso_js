class Comida{
	constructor(id,tipo,precio,calorias,existencias,nombre){
		this._id=id;
		this._tipo=tipo;
		this._precio=precio;
		this._calorias=calorias;
		this._existencias=existencias;
		this._nombre=nombre;
	}
}
class ComidaControler{
	constructor(api){
		this._baseUrl="http://formacion-indra-franlindebl.com/api/comidas";
		this._appClient=api;
	}
	getAllComida(){
		let completeUrl = this._baseUrl;
		let dataApi = "";
		let promise = this._appClient.get(completeUrl,dataApi)
			.then((data)=>{
			let	comidas=[];
			for(let i=0;i<data.length;i++){
				let comida= this.mapearObjeto(data[i])
					comidas.push(comida);
			}

			return comidas;
		})	
		.catch((data)=>{
			console.error("Fallo al traer data Comida");
		});
		return promise;
	}
	editarComida(comida){
		let completeUrl = this._baseUrl+"/"+comida._id;
		let dataApi = this.mapearJson(comida);
		let promise = this._appClient.put(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al editar el usuario");
		});
		return promise;
	}
	borrarComida(comida){
		let completeUrl = this._baseUrl+"/"+comida._id;
		let dataApi = "";
		let promise = this._appClient.delete(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al editar el usuario");
		});
		return promise;
	}
	crearComida(comida){
		let completeUrl = this._baseUrl;
		let dataApi = this.mapearJson(comida);
		let promise = this._appClient.post(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al editar el usuario");
		});
		return promise;
	}
	mapearJson(data,){
		let dataApi = null;
			dataApi = {
					tipo:data._tipo,
					precio:data._precio,
					calorias:data._calorias,
					existencias:data._existencias,
					nombre:data._nombre
			};

		return dataApi;
	}
	mapearObjeto(data){
		let comida= new Comida(
					data._id,
					data.tipo,
					data.precio,
					data.calorias,
					data.existencias,
					data.nombre);
		return comida;
	}


}