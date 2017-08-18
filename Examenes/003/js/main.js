class Pokemon{
	constructor(nombre,urlDetalle){
		this._nombre=nombre;
		this._urlDetalle=urlDetalle;
		this._urlImagen="";
		this._peso="";
		this._altura="";
	}
}
class Pokedex{
	constructor(mainControler){
		this._maincontroler=mainControler;
		this._pokemons=[]
		this._paginaActual=0;
		this._numeroTotal=0;
		this._pokemonApiClient=null;	
	}
	init(contenedorHtml,pokemonApiClient){
		this._contenedorHtml=contenedorHtml;
		this._pokemonApiClient=pokemonApiClient;
		this.pintarEstructura();
		this.getPokemoninit();
	}
	getPokemoninit(){
		this.pintarEstructura();
		this._pokemonApiClient.getPokemonPagina(this._paginaActual).then((data)=>{
		this.paintPaginaPokemon(data);
			console.log(data);
		});
	}
	getDetallePokemoninit(url){
		this.pintarEstructura();
		this._pokemonApiClient.getPokemonUrl(url).then((data)=>{
		//this.paintPaginaPokemon(data);
			console.log(data);
		});
	}
	paintPaginaPokemon(data){
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML=null;
		for (let i =0; i<data.length; i++) {
			let pokemon=data[i];
			let row =this.getRowForPokemon(pokemon);
			tbody.appendChild(row);	
		}
	}
	getRowForPokemon(pokemon){
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML=pokemon._nombre;
		tr.appendChild(td1);

		let button1=document.createElement("button");
		let td2=document.createElement("td");
		button1.innerHTML="Ver Detalles"
		button1.className = "btn btn-warning";
		button1.addEventListener("click", ()=>this._maincontroler.initDetallePokemon(pokemon));
		td2.appendChild(button1);

		tr.appendChild(td2);
		return tr;
	}
	initDetalle(detallePokemonApiClient,pokemon){
		this.getDetallePokemoninit(pokemon);
	}
	pintarEstructura(){
		let estructura =`
			<div class="well">
			<div id="cabecera" class="well">
					<h2 class="form-title">LA Pokedex Xanxa</h2>
					<form class="form-inline">
								<div class="form-group">
								    
									<button type="button" id="btnCrear" class="btn btn-success">< Anterior</button>
								</div>
								<div class="form-group">
								    <label id="paginacion" for="text"></label>

								</div>
								<div class="form-group">
									<button type="button" id="btnCrear" class="btn btn-success">Siguiente ></button>
								</div>
								
							  
					</form>
			</div>
	</div>
	<div class="row">
  		<div class="col-sm-4">
			<div id="listado" class="well">
				<table class="table table-striped table-bordered">
				    <thead>
				      <tr>
				        <th>Nombre</th>
				        <th>acciones</th>
				      </tr>
				    </thead>
				    <tbody>

				    </tbody>
			   </table>

	 		</div>
	 	</div>
	 	<div class="col-sm-4">
	 		<div id="detalle" class="well">
	 			
	 		</div>
	 	</div>
	 </div>
		`;
		this._contenedorHtml.innerHTML=estructura;
	}

}
class MainControler{
	constructor(){
		this._pokedex = new Pokedex(this);
		this._apiClient =new ApiClient();
		this._pokemonApiClient = new PokemonApiClient(this._apiClient);
		this._divPokedex=null;
		this._divdetallePokemon=null;
	}
	init(){
		this.pintarEstructura();
		this._pokedex.init(this._divPokedex,this._pokemonApiClient);
	}
	pintarEstructura(){

		this._container = document.createElement("div");
		this._container.className = "container";

		this._divPokedex = document.createElement("div");
		this._divPokedex.className = "almacen-Pokemons";

		this._container.appendChild(this._divPokedex);
		document.body.appendChild(this._container);
	}
	pintardetalle(){

		this._container = document.querySelector("#detalle");
		this._container.className = "container";

		this._divdetallePokemon = document.createElement("div");
		this._divdetallePokemon.className = "almacen-detalle";

		this._container.appendChild(this._divdetallePokemon);
		document.body.appendChild(this._container);
	}

	initDetallePokemon(pokemon){
		this.pintardetalle();
		this._pokedex.initDetalle(this._divdetallePokemon,pokemon);
	}
}
window.onload = () => {
	let mvc = new MainControler();
	mvc.init();	
}