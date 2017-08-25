class PaginaDos extends PaginaMenu{
	constructor(contenedorHtml,navigationControler,url,bebidaControler,titulo){
		super(contenedorHtml,navigationControler,url,titulo);
		this._bebidaControler=bebidaControler;
		this._estructura="";
	}
	pintar(){
		this.borrarPagina();
		this.pintarNavegacion();
		this.ponerEstructura();
		this.getAllBebida();
	}
	getAllBebida(){
		this.openLoader();
		this._bebidaControler.getAllBebidas().then((response)=>{ 
			this.paintAllBebida(response);
			this.closeLoader();
		});

	}
	paintAllBebida(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML=null;
		for (let i =0; i<data.length; i++) {
			let bebida=data[i];
			let row =this.getRowForBebida(bebida);
			tbody.appendChild(row);	
		}
	}
	Pintadetalle(div){
		if(div.className=="detallelinktrue"){
			div.className="detallelinknone";
		}else{
			div.className="detallelinktrue";
		}
	}
	getRowForBebida(bebida){
		let tr = document.createElement("tr");

		let td2 = document.createElement("td");
		let detail = document.createElement("div");
		detail.className="detallelinknone"
		let sumary = document.createElement("a");
		sumary.addEventListener("click",()=>this.Pintadetalle(detail));
		sumary.innerHTML=bebida._nombre;
		let p1 = document.createElement("p");
		if(bebida._esAlcoholica.length==0)
			bebida._esAlcoholica=false;
		p1.innerHTML="Es Alcololica: "+bebida._esAlcoholica;
		let p2 = document.createElement("p");
		if(bebida._grados.length==0)
			bebida._esAlcoholica=0;
		p2.innerHTML="Grados de Alcohol: "+bebida._grados;
		let p3 = document.createElement("p");
		p3.innerHTML="Calorias de la bebida: "+bebida._calorias;
		td2.appendChild(sumary);
		detail.appendChild(p1);
		detail.appendChild(p2);
		detail.appendChild(p3);
		td2.appendChild(detail);
		tr.appendChild(td2);

		let td6 = document.createElement("td");
		td6.className ="datocantidad";
		td6.innerHTML=bebida._existencias;
		tr.appendChild(td6);
		let td5 = document.createElement("td");
		td5.className ="datoprecio"
		td5.innerHTML=bebida._precio;
		tr.appendChild(td5);

		let button1=document.createElement("button");
		let td7=document.createElement("td");
		button1.innerHTML="Editar"
		button1.className = "btn btn-warning";
		button1.addEventListener("click", ()=>this.cargarEditarBebida(bebida));
		td7.className="btnbebidaaccion";
		td7.appendChild(button1);
		tr.appendChild(td7);

		let button2 = document.createElement("button");
		button2.innerHTML = "Borrar"
		button2.className = "btn btn-danger";
		button2.addEventListener("click", ()=>this.borrarBebida(bebida));
		td7.appendChild(button2);
		tr.appendChild(td7);
		return tr;
	}
	resetForm(){
		this._contenedorHtml.querySelector("#btnCrear").style.visibility = 'visible';
		this._contenedorHtml.querySelector("#btnEditar").style.visibility = 'hidden';
		this._contenedorHtml.querySelector("#id").value = "";
		this._contenedorHtml.querySelector("#nombre").value = "";
		this._contenedorHtml.querySelector("#selectbebida").value = "Falso";
		this._contenedorHtml.querySelector("#grados").value = "";
		this._contenedorHtml.querySelector("#existencias").value = "";
		this._contenedorHtml.querySelector("#precio").value = "";
		this._contenedorHtml.querySelector("#calorias").value = "";
	}
	cargarEditarBebida(bebida){
		this._contenedorHtml.querySelector("#btnCrear").style.visibility ='hidden';
		this._contenedorHtml.querySelector("#btnEditar").style.visibility ='visible';
		this._contenedorHtml.querySelector("#id").value=bebida._id;
		this._contenedorHtml.querySelector("#nombre").value=bebida._nombre;
		let valorSelect="Falso";
		if(bebida._esAlcoholica == true){
			valorSelect="Verdadero";
		}
		this._contenedorHtml.querySelector("#selectbebida").value = valorSelect;
		this._contenedorHtml.querySelector("#grados").value = bebida._grados;
		this._contenedorHtml.querySelector("#existencias").value = bebida._existencias;
		this._contenedorHtml.querySelector("#precio").value = bebida._precio;
		this._contenedorHtml.querySelector("#calorias").value = bebida._calorias;
	}
	cargaDataBebida(){
		let bebida = new Comida();
		bebida._id = this._contenedorHtml.querySelector("#id").value;
		bebida._nombre = this._contenedorHtml.querySelector("#nombre").value;
		let alcohol = this._contenedorHtml.querySelector("#selectbebida").value
		if (alcohol =="Verdadero"){
			bebida._esAlcoholica = true;
		}else{
			bebida._esAlcoholica = false;
		}
		bebida._grados = this._contenedorHtml.querySelector("#grados").value;
		bebida._existencias = this._contenedorHtml.querySelector("#existencias").value;
		bebida._precio = this._contenedorHtml.querySelector("#precio").value;
		bebida._calorias = this._contenedorHtml.querySelector("#calorias").value;

		return bebida;
	}
	editarBebida(){
		this.openLoader();
		let bebida=this.cargaDataBebida();
		if(bebida._id.length<0||bebida._nombre.length<0||bebida._grados.length<0||bebida._existencias.length<0||bebida._precio.length<0||bebida._calorias.length<0){
			this.openModal("Error","Datos incompletos","default");
		}else{
			this._bebidaControler.editarBebida(bebida).then((response)=>{ 
				this.openModal("Aviso","Bebida Editada","default");
				this.getAllBebida();
				this.resetForm();
				this.closeLoader();
			});
		}
	}
	borrarBebida(bebida){
		this._bebidaControler.borrarBebida(bebida).then((response)=>{ 
			this.openModal("Aviso","Bebida Eliminada","default");
			this.getAllBebida();
			this.resetForm(); 
		});

	}
	crearBebida(){
		this.openLoader();
		let bebida=this.cargaDataBebida();
		if(bebida._id.length<0||bebida._nombre.length<0||bebida._grados.length<0||bebida._existencias.length<0||bebida._precio.length<0||bebida._calorias.length<0){
			this.openModal("Error","Datos incompletos","default");
		}else{
			this._bebidaControler.crearBebida(bebida).then((response)=>{ 
				this.openModal("Aviso","Bebida Creada","default");
				this.getAllBebida();
				this.resetForm();
				this.closeLoader();
			}); 
		}
	}
	ponerEstructura(){
		let estructura =`
			<h3 class="main-title">Gestion de Bebidas</h3>
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
										<label for="email">Alcoholica</label>
									      <select id="selectbebida" class="form-control" id="sel1">
									        <option>Verdadero</option>
									        <option>Falso</option>
									      </select>
								</div>
								<div class="form-group">
										<label for="email">Grados</label>
										<input text="email" class="form-control" id="grados" size="10">
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
			<div class="row" id="datosbebida">
  			<div class="col-sm-12">
				<table id="tablecomida" class="table table-striped table-bordered">
				    <thead>
				      <tr>
				        <th>Nombre</th>
				        <th>Existencias</th>
				         <th>Precio</th>
				        <th>Acciones</th>
				      </tr>
				    </thead>
				    <tbody>

				    </tbody>
		  		</table>
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
		botonCrear.addEventListener("click",()=>this.crearBebida());
		let botonEditar = this._contenedorHtml.querySelector("#btnEditar");
		botonEditar.addEventListener("click",()=>this.editarBebida());
		let botonReset = this._contenedorHtml.querySelector("#btnReset");
		botonReset.addEventListener("click",()=>this.resetForm());
	
	}
}
