
class PaginaUno extends PaginaMenu{
	constructor(contenedorHtml,navigationControler,url,comidaControler,titulo){
		super(contenedorHtml,navigationControler,url,titulo);
		this._comidaControler=comidaControler;
		this._estructura="";
	}
	pintar(){
		this.borrarPagina();
		this.pintarNavegacion();
		this.ponerEstructura();
		this.getAllComida();
	}
	getAllComida(){
		this.openLoader();
		this._comidaControler.getAllComida().then((response)=>{ 
			this.paintAllComida(response);
			this.closeLoader();
		});

	}
	paintAllComida(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("#tablacomida");
		tbody.innerHTML=null;
		for (let i =0; i<data.length; i++) {
			let comida=data[i];
			let row =this.getRowForComida(comida);
			tbody.appendChild(row);	
		}
	}
	getRowForComida(comida){
		let tbody = this._contenedorHtml.querySelector("#tablacomida");
		let tr = document.createElement("div");
		tr.className="row";
		
		let td2= document.createElement("div");
		td2.className="classfila1 col-sm-3";
		td2.innerHTML=comida._nombre;
		tr.appendChild(td2);

		let td6 = document.createElement("div");
		td6.className="classfila1 col-sm-3";
		td6.innerHTML=comida._existencias;
		tr.appendChild(td6);

		let button1=document.createElement("button");
		let td7=document.createElement("div");
		td7.className="classfila2 col-sm-6";
		button1.innerHTML="<span class='glyphicon glyphicon-pencil'></span></p>";
		button1.className = "btncomida btn-warning";
		button1.addEventListener("click", ()=>this.cargarEditarComida(comida));
		td7.appendChild(button1);

		let button2 = document.createElement("button");
		button2.innerHTML = "<span class='glyphicon glyphicon-trash'></span></p>";
		button2.className = "btncomida btn-danger";
		button2.addEventListener("click", ()=>this.borrarComida(comida));
		td7.appendChild(button2);
		let button3 = document.createElement("button");
		button3.innerHTML = "<span class='glyphicon glyphicon-list-alt'></span></p>";
		button3.className = "btncomida btn-info";
		button3.addEventListener("click", ()=>this.pintarDetalle(comida));
		td7.appendChild(button3);
		tr.appendChild(td7); 

		return tr;
	}//funciona si no alcanzamos dejar este
	/*getRowForComida(comida){
		let tr = document.createElement("tr");

		
		let td2= document.createElement("td");
		td2.innerHTML=comida._nombre;
		tr.appendChild(td2);

		let td6 = document.createElement("td");
		td6.innerHTML=comida._existencias;
		tr.appendChild(td6);

		let button1=document.createElement("button");
		let td7=document.createElement("td");
		button1.innerHTML="Editar"
		button1.className = "btn btn-warning";
		button1.addEventListener("click", ()=>this.cargarEditarComida(comida));
		td7.className="btncomidaaccion";
		td7.appendChild(button1);

		let button2 = document.createElement("button");
		button2.innerHTML = "Borrar"
		button2.className = "btn btn-danger";
		button2.addEventListener("click", ()=>this.borrarComida(comida));
		td7.appendChild(button2);
		let button3 = document.createElement("button");
		button3.innerHTML = "Detalle"
		button3.className = "btn btn-info";
		button3.addEventListener("click", ()=>this.pintarDetalle(comida));
		td7.appendChild(button3);
		tr.appendChild(td7);

		return tr;
	}*/
	cargaDataComida(){
		let comida = new Comida();
		comida._id=this._contenedorHtml.querySelector("#id").value;
		comida._nombre=this._contenedorHtml.querySelector("#nombre").value;
		comida._tipo=this._contenedorHtml.querySelector("#tipo").value;
		comida._existencias=this._contenedorHtml.querySelector("#existencias").value;
		comida._precio=this._contenedorHtml.querySelector("#precio").value;
		comida._calorias=this._contenedorHtml.querySelector("#calorias").value;

		return comida;
	}
	cargarEditarComida(comida){
		this._contenedorHtml.querySelector("#btnCrear").style.visibility='hidden';
		this._contenedorHtml.querySelector("#btnEditar").style.visibility='visible';
		this._contenedorHtml.querySelector("#id").value=comida._id;
		this._contenedorHtml.querySelector("#nombre").value=comida._nombre;
		this._contenedorHtml.querySelector("#tipo").value=comida._tipo;
		this._contenedorHtml.querySelector("#existencias").value=comida._existencias;
		this._contenedorHtml.querySelector("#precio").value=comida._precio;
		this._contenedorHtml.querySelector("#calorias").value=comida._calorias;
	
	}
	resetForm(){
		this._contenedorHtml.querySelector("#btnCrear").style.visibility='visible';
		this._contenedorHtml.querySelector("#btnEditar").style.visibility='hidden';
		this._contenedorHtml.querySelector("#id").value="";
		this._contenedorHtml.querySelector("#nombre").value="";
		this._contenedorHtml.querySelector("#tipo").value="";
		this._contenedorHtml.querySelector("#existencias").value="";
		this._contenedorHtml.querySelector("#precio").value="";
		this._contenedorHtml.querySelector("#calorias").value="";
	
	}
	editarComida(){
		this.openLoader();
		let comida=this.cargaDataComida();
		if(comida._id.length<0||comida._nombre.length<0||comida._tipo.length<0||comida._existencias.length<0||comida._precio.length<0||comida._calorias.length<0){
			this.openModal("Error","Datos incompletos","default");
		}else{
				this._comidaControler.editarComida(comida).then((response)=>{ 
				this.openModal("Aviso","Comida Editada","default");
				this.getAllComida();
				this.resetForm();
				this.closeLoader();
			});
		}
	}
	borrarComida(comida){
		this.openLoader();
		this._comidaControler.borrarComida(comida).then((response)=>{ 
			this.openModal("Aviso","Comida Eliminada","default");
			this.getAllComida();
			this.resetForm();
			this.closeLoader();
		});

	}
	crearComida(){
		this.openLoader();
		let comida=this.cargaDataComida();
		if(comida._id.length<0||comida._nombre.length<0||comida._tipo.length<0||comida._existencias.length<0||comida._precio.length<0||comida._calorias.length<0){
			this.openModal("Error","Datos incompletos","default");
		}else{
			this._comidaControler.crearComida(comida).then((response)=>{ 
				this.openModal("Aviso","Comida Editada","default");
				this.getAllComida();
				this.resetForm();
				this.closeLoader();
			}); 
		}
	}
		
	pintarDetalle(comida){
		let container = document.querySelector("#detallecomida");
		container.innerHTML="";
		let divContenido = document.createElement("div");
		divContenido.innerHTML="El tipo de comida es "+comida._tipo;
		container.appendChild(divContenido);

		divContenido = document.createElement("div");
		divContenido.innerHTML="El Costo de este Alimento es: "+comida._precio;
		container.appendChild(divContenido);

		divContenido = document.createElement("div");
		divContenido.innerHTML="Las calorias que contien son: "+comida._calorias;
		container.appendChild(divContenido);
	}
	ponerEstructura(){
		let estructura =`
			<h3 class="main-title">Gestion de Comida</h3>
			<div class="well">
					<form id="formcomida" class="form-inline">
								<div class="form-group">
							    	<input type="hidden" class="form-control" id="id">
								</div>
								<div class="form-group">
								    <label for="email">Nombre</label>
								    <input type="text" class="form-control" id="nombre" size="10">
								</div>
								<div class="form-group">
										<label for="email">Tipo</label>
										<select id="tipo" class="form-control" id="sel1">
									        <option>Entrante</option>
									        <option>Principal</option>
									        <option>Postre</option>
									      </select>
								</div>
								<div class="form-group">
										<label for="email">Existencias</label>
										<input text="email" class="form-control" id="existencias" size="10">
								</div>
								<div class="form-group">
										<label for="email">Precio</label>
										<input text="email" class="form-control" id="precio" size="10">
								</div>
								<div class="form-group">
										<label for="email">Calorias</label>
										<input text="email" class="form-control" id="calorias" size="10">
								</div>
								<button type="button" id="btnCrear" class="btn btn-success">Crear</button>
								<button type="button" id="btnEditar"class="btn btn-success">Guardar</button>
								<button type="button" id="btnReset"class="btn btn-info">Reset</button>
					</form>
			</div>
			<div class button-container>	
				<span>   </spand>
			</div>
			<div class="row">
  			<div id="tablacomida" class="col-sm-7">
  			 	<div class="divdetalle row">
    				<div class="classfila1 col-sm-3">Comida/div>
    				<div class="classfila2 col-sm-3">Existencias</div>
    				<div class="classfila2 col-sm-6">Acciones</div>
    			</div>
 			</div>
		  </div>
		  <div id="detallecomida" class="col-sm-5">
		  	
		  </div>
		  <div id="contenedorModal">
		  </div>
		</div>`;
		let container = document.querySelector("body");
		let divContenido = document.createElement("div");
		divContenido.className = "container";
		divContenido.innerHTML=estructura;
		this._contenedorHtml.appendChild(divContenido);
		//botones
		let botonCrear = this._contenedorHtml.querySelector("#btnCrear");
		botonCrear.addEventListener("click",()=>this.crearComida());
		let botonEditar = this._contenedorHtml.querySelector("#btnEditar");
		botonEditar.addEventListener("click",()=>this.editarComida());
		let botonReset = this._contenedorHtml.querySelector("#btnReset");
		botonReset.addEventListener("click",()=>this.resetForm());

	}
}