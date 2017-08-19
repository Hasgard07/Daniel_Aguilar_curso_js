class Pokemon{
	constructor(nombre,urlDetalle,urlImagen,peso,altura){
		this._nombre=nombre;
		this._urlDetalle=urlDetalle;
		this._urlImagen=urlImagen;
		this._peso=peso;
		this._altura=altura;
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
		this._pokemonApiClient.getPokemonPagina(this._paginaActual,this).then((data)=>{
		this.paintPaginaPokemon(data);
			console.log(data);
		});
	}
	getDetallePokemoninit(pokemon){
		this._pokemonApiClient.getPokemonUrl(pokemon._urlDetalle).then((data)=>{
			console.log(data);
			pokemon._urlImagen=data._urlImagen;
			pokemon._peso=data._peso;
			pokemon._altura=data._altura;
			this.paintDetallePokemon(pokemon);
		});

	}
	paintDetallePokemon(pokemon){
		let cuerpo = this._contenedorHtml.querySelector("#imagen");
		cuerpo.innerHTML=null;
		let div=document.createElement("img");
		let clase="img-pokemon"
		div.setAttribute("class",clase);
		div.setAttribute("src",pokemon._urlImagen);
		cuerpo.appendChild(div);
		cuerpo = this._contenedorHtml.querySelector("#nombre");
		cuerpo.innerHTML="Nombre: "+pokemon._nombre;
		cuerpo = this._contenedorHtml.querySelector("#peso");
		cuerpo.innerHTML="Peso: "+pokemon._peso;
		cuerpo = this._contenedorHtml.querySelector("#altura");
		cuerpo.innerHTML="Altura: "+pokemon._altura;

		//cuerpo.appendChild(img);	
	}
	paintPaginaPokemon(data){
		let pagina=this._contenedorHtml.querySelector("#paginacion");
		pagina.innerHTML=this._paginaActual+1;
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
	initDetalle(pokemon){
		this.getDetallePokemoninit(pokemon);
	}
	pintarEstructura(){
		let estructura =`
			<div class="well">
			<div id="cabecera" class="well">
					<h2 class="form-title">LA Pokedex Xanxa</h2>
					<form class="form-inline">
								<div class="form-group">
								    
									<button type="button" id="btnAtras" class="btn btn-success">< Anterior</button>
								</div>
								<div class="form-group">
								    <label id="paginacion" for="text"></label>

								</div>
								<div class="form-group">
									<button type="button" id="btnAdelante" class="btn btn-success">Siguiente ></button>
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
	 			<div id="imagen">
	 			</div>
	 			<div id="nombre">
	 			</div>
	 			<div id="peso">
	 			</div>
	 			<div id="altura">
	 			</div>
	 		</div>
	 	</div>
	 </div>
		`;
		this._contenedorHtml.innerHTML=estructura;


	let botonAtras = this._contenedorHtml.querySelector("#btnAtras");
	botonAtras.addEventListener("click",()=>this._maincontroler.paginarAtas());
	let botonReAdelante = this._contenedorHtml.querySelector("#btnAdelante");
	botonReAdelante.addEventListener("click",()=>this._maincontroler.paginarAdelante());
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
	paginarAtas(){
		if(this._pokedex._paginaActual!=0){
			this._pokedex._paginaActual=this._pokedex._paginaActual-1;
			//this.pintarEstructura();
			this._pokedex.init(this._divPokedex,this._pokemonApiClient);
		}
	}
	paginarAdelante(){
		let maxPaginas=Math.trunc(this._pokedex._numeroTotal/20);
		if(this._pokedex._paginaActual<maxPaginas){
			this._pokedex._paginaActual=this._pokedex._paginaActual+1;
			//this.pintarEstructura();
			this._pokedex.init(this._divPokedex,this._pokemonApiClient);
		}
	}
	initDetallePokemon(pokemon){
		//this.pintarEstructura();
		this._pokedex.initDetalle(pokemon);
	}
}
window.onload = () => {
	let mvc = new MainControler();
	mvc.init();	
}