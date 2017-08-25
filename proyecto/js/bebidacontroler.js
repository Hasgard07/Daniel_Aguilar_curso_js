class Bebida{
	constructor(id,grados,esAlcoholica,precio,calorias,existencias,nombre){
		this._id=id;
		this._grados=grados;
		this._esAlcoholica=esAlcoholica;
		this._precio=precio;
		this._calorias=calorias;
		this._existencias=existencias;
		this._nombre=nombre;
	}
}
class BebidaControler{
	constructor(api){
		this._baseUrl="http://formacion-indra-franlindebl.com/api/bebidas";
		this._appClient=api;
	}
	getAllBebidas(){
		let completeUrl = this._baseUrl;
		let dataApi = "";
		let promise = this._appClient.get(completeUrl,dataApi)
			.then((data)=>{
			let	bebidas=[];
			for(let i=0;i<data.length;i++){
				let bebida= this.mapearObjeto(data[i])
					bebidas.push(bebida);	
			}
			return bebidas;
		})	
		.catch((data)=>{
			console.error("Fallo al traer data Bebida");
		});
		return promise;
	}
	editarBebida(bebida){
		let completeUrl = this._baseUrl+"/"+bebida._id;
		let dataApi = this.mapearJson(bebida);
		let promise = this._appClient.put(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al editar Bebida");
		});
		return promise;
	}
	borrarBebida(bebida){
		let completeUrl = this._baseUrl+"/"+bebida._id;
		let dataApi = "";
		let promise = this._appClient.delete(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al Borrar Bebida");
		});
		return promise;
	}
	crearBebida(bebida){
		let completeUrl = this._baseUrl;
		let dataApi = this.mapearJson(bebida);
		let promise = this._appClient.post(completeUrl,dataApi)
			.then((data)=>{
			return data;
		})	
		.catch((data)=>{
			console.error("Fallo al Crear Bebida");
		});
		return promise;
	}
	mapearJson(data,){
		let dataApi = null;
			dataApi = {
					grados:data._grados,
					esAlcoholica:data._esAlcoholica,
					precio:data._precio,
					calorias:data._calorias,
					existencias:data._existencias,
					nombre:data._nombre
			};

		return dataApi;
	}
	mapearObjeto(data){
		let bebida= new Bebida(
					data._id,
					data.grados,
					data.esAlcoholica,
					data.precio,
					data.calorias,
					data.existencias,
					data.nombre);
		return bebida;
	}

}