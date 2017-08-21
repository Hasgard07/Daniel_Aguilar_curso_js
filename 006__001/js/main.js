class SuperHeroe{
	constructor(identificador,apodo,arma,trabajo,deuda){
		this._identificador=identificador;
		this._apodo=apodo;
		this._arma=arma;
		this._trabajo=trabajo;
		this._deuda=deuda
	}
}
class MainControler{
	constructor(){
		this._container = null;
		this._divAlmacenSuperheroes = null;
		this._apiClient =new ApiClient();//se instancia la comunicacion
		this._superHeroesApiClient = new SuperHeroClient(this._apiClient);//se le pasa la comunicacion al mapeo de datos
		this._alamacenSuperheroes = new AlamacenSuperheroes();//se instancia donde guardaremos os objetos recibidos
	}
	init(){
		this.pintarEstructura();
		this._alamacenSuperheroes.init(this._divAlmacenSuperheroes,this._superHeroesApiClient);
	}
	pintarEstructura(){

		this._container = document.createElement("div");
		this._container.className = "container";

		this._divAlmacenSuperheroes = document.createElement("div");
		this._divAlmacenSuperheroes.className = "almacen-superheroes";

		this._container.appendChild(this._divAlmacenSuperheroes);
		document.body.appendChild(this._container);
	}
}
class AlamacenSuperheroes{
	constructor(){
		this._contenedorHtml=null;
		this._superherores=[];
		this._superHeroesApiClient;
	}
	init(contenedorHtml,superHeroesApiClient){
		this._contenedorHtml=contenedorHtml;
		this._superHeroesApiClient=superHeroesApiClient;
		this.pintarEstructura();
		this.getAllSuperHeroesAndpaint();
	}
	getAllSuperHeroesAndpaint(){
		this.pintarEstructura();
		this._superHeroesApiClient.getAllSuperHeroes().then((data)=>{
			this.paintAllSuperHeroe(data);
		});
	}
	paintAllSuperHeroe(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML=null;
		for (let i =0; i<data.length; i++) {
			let superHeroe=data[i];
			let row =this.getRowForSuperHeroe(superHeroe);
			tbody.appendChild(row);	
		}
	}
	getRowForSuperHeroe(superHeroe){
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML=superHeroe._identificador;
		tr.appendChild(td1);

		
		let td2= document.createElement("td");
		td2.innerHTML=superHeroe._apodo;
		tr.appendChild(td2);

	
		let td3 = document.createElement("td");
		td3.innerHTML=superHeroe._arma;
		tr.appendChild(td3);

		
		let td4 = document.createElement("td");
		td4.innerHTML=superHeroe._trabajo;
		tr.appendChild(td4);

		
		let td5 = document.createElement("td");
		td5.innerHTML=superHeroe._deuda;
		tr.appendChild(td5);

		let button1=document.createElement("button");
		let td6=document.createElement("td");
		button1.innerHTML="Editar"
		button1.className = "btn btn-warning";
		button1.addEventListener("click", ()=>this.cargarEditarSuperHeroe(superHeroe));
		td6.appendChild(button1);

		let button2 = document.createElement("button");
		button2.innerHTML = "Borrar"
		button2.className = "btn btn-danger";
		button2.addEventListener("click", ()=>this.borrarSuperHeroe(superHeroe));
		td6.appendChild(button2);
		tr.appendChild(td6);

		return tr;
	}
	cargarEditarSuperHeroe(superHeroe){
		this._contenedorHtml.querySelector("#btnCrear").style.visibility='hidden';
		this._contenedorHtml.querySelector("#btnEditar").style.visibility='visible';
		this._contenedorHtml.querySelector("#id").value=superHeroe._identificador;
		this._contenedorHtml.querySelector("#nombre").value=superHeroe._apodo;
		this._contenedorHtml.querySelector("#arma").value=superHeroe._arma;
		this._contenedorHtml.querySelector("#profesion").value=superHeroe._trabajo;
		this._contenedorHtml.querySelector("#deuda").checked=superHeroe._deuda;

	}
	editarSuperHeroe(){
		let id=this._contenedorHtml.querySelector("#id").value;
		let nombre = this._contenedorHtml.querySelector("#nombre").value;
		let arma = this._contenedorHtml.querySelector("#arma").value;
		let profesion = this._contenedorHtml.querySelector("#profesion").value;
		let deuda = this._contenedorHtml.querySelector("#deuda").checked;
		let nuevoSuperheroe = new SuperHeroe(id,nombre,arma,profesion,deuda);
		this._superHeroesApiClient.editSuperHeroes(nuevoSuperheroe).then((response)=>{
			this.getAllSuperHeroesAndpaint();
			this._contenedorHtml.querySelector("#btnCrear").style.visibility='visible';
			this._contenedorHtml.querySelector("#btnEditar").style.visibility='hidden';
		});
		

	}
	borrarSuperHeroe(superHeroe){
		this._superHeroesApiClient.deleteSuperHeroes(superHeroe._identificador).then((response)=>{
				this.getAllSuperHeroesAndpaint();
			});

	}
	crearSuperHeroe(){
		let id="";
		let nombre = this._contenedorHtml.querySelector("#nombre").value;
		let arma = this._contenedorHtml.querySelector("#arma").value;
		let profesion = this._contenedorHtml.querySelector("#profesion").value;
		let deuda = this._contenedorHtml.querySelector("#deuda").checked;
		let nuevoSuperheroe = new SuperHeroe(id,nombre,arma,profesion,deuda);
		this._superHeroesApiClient.createSuperHeroes(nuevoSuperheroe).then((response)=>{
				this.getAllSuperHeroesAndpaint();
			});
	}
	pintarEstructura(){

		let estructura =`
		<h2 class="main-title">CRUD de Superhéroes</h1>
		<div class="well">
				<h2 class="form-title">Formulario</h1>
				<form class="form-inline">
							<div class="form-group">
							    <input type="hidden" class="form-control" id="id">
							</div>
							<div class="form-group">
							    <label for="email">Nombre</label>
							    <input type="text" class="form-control" id="nombre">
							</div>
							<div class="form-group">
									<label for="email">Arma</label>
									<input type="text" class="form-control" id="arma">
							</div>
							<div class="form-group">
									<label for="email">Profesión</label>
									<input text="email" class="form-control" id="profesion">
							</div>
						  <div class="checkbox">
						    <label><input type="checkbox" id="deuda" value="true">Deuda</label>
						  </div>

							<button type="button" id="btnCrear" class="btn btn-success">Crear</button>
							<button type="button" id="btnEditar"class="btn btn-success">Editar</button>
							<button type="button" id="btnReset"class="btn btn-info">Reset</button>
				</form>
		</div>
		<div class button-container>	
			<button type="button" id="refrescar" class="btn btn-primary">Refrescar</button>
		</div>
		<div class="well">
			<table class="table table-striped table-bordered">
	    <thead>
	      <tr>
	        <th>ID</th>
	        <th>Nombre</th>
	        <th>Arma</th>
	        <th>Profesión</th>
	        <th>Deuda</th>
	        <th>Acciones</th>
	      </tr>
	    </thead>
	    <tbody>

	    </tbody>
	  </table>
	  </div>
	</div>`;
	this._contenedorHtml.innerHTML=estructura;
	//boton refrescar
	let botonRefrescar = this._contenedorHtml.querySelector("#refrescar");
	botonRefrescar.addEventListener("click",()=>this.getAllSuperHeroesAndpaint());
	let botonCrear = this._contenedorHtml.querySelector("#btnCrear");
	botonCrear.addEventListener("click",()=>this.crearSuperHeroe());
	let botonEditar = this._contenedorHtml.querySelector("#btnEditar");
	botonEditar.addEventListener("click",()=>this.editarSuperHeroe());

	}
}
window.onload = () => {
	let mvc = new MainControler();
	mvc.init();	
}