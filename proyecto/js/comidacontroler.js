class Comida{
	constructor(){
		this._id="";
		this._tipo="";
		this._precio="";
		this._calorias="";
		this._existencias="";
		this._nombre="";
	}
}
class ComidaControler{
	constructor(ClienteComida){
		this._clienteApiUser=ClienteComida;
		this._comidas=[];
		this._comida=new Comida();
	}
	getAllComida(){
		let retorno=0;
		let promise
		promise=this._clienteApiUser.getComida().then((response)=>{
			retorno=response;
			if(response){
				for (var i = 0; i < response.length; i++) {
					this._comida._id=response[i]._id;
					this._comida._tipo=response[i].tipo;
					this._comida._precio=response[i].precio;
					this._comida._calorias=response[i].calorias;
					this._comida._existencias=response[i].existencias;
					this._comida._nombre=response[i].nombre;
					this._comidas.push(this._comida);
				}
			}
			return retorno;
		});
		return promise;
	}
}