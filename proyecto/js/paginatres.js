	class PaginaTres extends PaginaMenu{
	constructor(contenedorHtml,navigationControler,url,userControler,titulo){
		super(contenedorHtml,navigationControler,url,titulo);
		this._userControler=userControler;
		this._estructura="";
	}
	pintar(){
		this.borrarPagina();
		this.pintarNavegacion();
		this.ponerEstructura();
	}
	
	ponerEstructura(){
		this._estructura=`
		<div id="login" class="container">
			<h2>Modificar Usuario Actual</h2>
			<form id="Formeditarusuario" action="/action_page.php">
			  <div class="container">
			    <label><b>Usuario</b></label>
			    	<input id="editarusuario" disabled="disabled" type="text" placeholder="Introduzca su Usuario" name="email" required>
			    <label><b>Nombre</b></label>
			    	<input id="editarnombre" disabled="disabled" type="text" placeholder="Introduzca su Nombre" name="email" required>
			    <label><b>Apellidos</b></label>
			    	<input id="editarapellido" disabled="disabled" type="text" placeholder="Introduzca su Apellidos" name="email" required>
			    <label><b>Email</b></label>
			    	<input id="editaremail" disabled="disabled" type="text" placeholder="Introduzca su Email" name="email" required>
			    <div class="clearfix">
			    <div class="row">
			    	 <div class="col-sm-4">
			    		<button type="button" id="btn-editaru" class="btn-warning">Editar Usuario</button>
			    	</div>
			    	<div class="col-sm-4">
			    		<button type="button" id="btn-guardaru" class="btnguardaoff signupbtn">Guardar Edicion</button>
			    	</div>
			    	<div class="col-sm-4">
			    		<button type="button" id="btn-eliminaru" class="signupbtn">Borrar Usuario</button>
			    	</div>
			    </div>
			    <div id="contenedorModal">
			    </div>
			  </div>
			</form>
		</div>
		`;
		let container = document.querySelector("body");
		let divContenido = document.createElement("div");
		divContenido.className = "container";
		divContenido.innerHTML=this._estructura;
		this._contenedorHtml.appendChild(divContenido);
		/*datos de usuario*/
		let campo = this._contenedorHtml.querySelector("#editarusuario");
		campo.value=this._userControler._usuarioactivo._usuario;
		campo = this._contenedorHtml.querySelector("#editarnombre");
		campo.value=this._userControler._usuarioactivo._nombre;
		campo = this._contenedorHtml.querySelector("#editarapellido");
		campo.value=this._userControler._usuarioactivo._apellido;
		campo = this._contenedorHtml.querySelector("#editaremail");
		campo.value=this._userControler._usuarioactivo._mail;
		/*botones*/
		let botoneditar = this._contenedorHtml.querySelector("#btn-editaru");
		botoneditar.addEventListener("click",()=>this.pintarEditar("false")); 
		let botonguardar = this._contenedorHtml.querySelector("#btn-guardaru");
		botonguardar.addEventListener("click",()=>this.pintarGuardar()); 
		let botoneliminar = this._contenedorHtml.querySelector("#btn-eliminaru");
		botoneliminar.addEventListener("click",()=>this.pintarBorrar()); 
	}
	pintarEditar(estado)
	{

		 let boton = this._contenedorHtml.querySelector("#btn-guardaru");
		 boton.className="btnguardaon";
		if(estado=="false")
		{
			let campo = this._contenedorHtml.querySelector("#editarusuario");
			campo.disabled=false;
			campo = this._contenedorHtml.querySelector("#editarnombre");
			campo.disabled=false;
			campo = this._contenedorHtml.querySelector("#editarapellido");
			campo.disabled=false;
			campo = this._contenedorHtml.querySelector("#editaremail");
			campo.disabled=false;
			let boton = this._contenedorHtml.querySelector("#btn-guardaru");
		 	boton.className="btnguardaon";
		}
		if(estado=="true"){
			let campo = this._contenedorHtml.querySelector("#editarusuario");
			campo.disabled=true;
			campo = this._contenedorHtml.querySelector("#editarnombre");
			campo.disabled=true;
			campo = this._contenedorHtml.querySelector("#editarapellido");
			campo.disabled=true;
			campo = this._contenedorHtml.querySelector("#editaremail");
			campo.disabled=true;
			let boton = this._contenedorHtml.querySelector("#btn-guardaru");
		 	boton.className="btnguardaoff";
		}
	}
	pintarGuardar(){
		this.openLoader();
		this.pintarEditar("true");
		let campo = this._contenedorHtml.querySelector("#editarusuario");
		this._userControler._usuarioactivo._usuario=campo.value;
		campo = this._contenedorHtml.querySelector("#editarnombre");
		this._userControler._usuarioactivo._nombre=campo.value;
		campo = this._contenedorHtml.querySelector("#editarapellido");
		this._userControler._usuarioactivo._apellido=campo.value;
		campo = this._contenedorHtml.querySelector("#editaremail");
		this._userControler._usuarioactivo._mail=campo.value;
		if(this._userControler._usuarioactivo._usuario.length>0||this._userControler._usuarioactivo._nombre.length>0||this._userControler._usuarioactivo._apellido.length>0||this._userControler._usuarioactivo._mail.length>0){
			this._userControler.editarUsuario(this._userControler._usuarioactivo).then((response)=>{
			this.closeLoader();
				if(response._id){
					this.openModal("Realizado","Usuario Modificado","default");
				}
				else{
					this.openModal("revisar","Usuario no se pudo Modificar","default");
				}

			});
		}
		else{
			this.openModal("Verifica","Rellena todos los Campos","default");
		}


	}
	pintarBorrar(){
		this.openLoader();
		this._userControler.borrarUsuario(this._userControler._usuarioactivo).then((response)=>{ 
			if(response.message=="User borrado"){
				let button1=document.createElement("button");
				button1.innerHTML="Aceptar"
				button1.className = "btn btn-warning";
				button1.addEventListener("click", ()=>this._navigationControler.navergarUrl("#login"));
				this.closeLoader();
				this.openModal("Confirmacion","Usuario Borrado",button1);
			}else{
				this.openModal("Fallo",response.message,"default");
			}
		});			
	}
}