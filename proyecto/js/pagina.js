class Pagina{
	constructor(contenedorHtml,navigationControler,url){
		this._urlPagina=url;
		this._head="";
		this._footer="";
		this._contenedorHtml=contenedorHtml;
		this._navigationControler=navigationControler;
	}
	ponerLoader(){
		let divloader=document.createElement("div");
		divloader.className = "loader";
		//let home = document.querySelector("");
		//home.appendChild(divloader);
	}
	borrarPagina(){
		let bodyPintado = document.querySelector("body");
		bodyPintado.innerHTML=null;
	}
	closeModal(){
		var modal = document.querySelector("#modal");
		if(modal){
			modal.parentElement.removeChild(modal);
		}
	}
	openModal(title,mensaje,boton){
		let modal  =  document.querySelector("#contenedorModal");
		let contenedorModal=document.createElement("div");
		contenedorModal.setAttribute("id", "modal");
		contenedorModal.innerHTML = `
			<div class="modal fade in" id="myModal" role="dialog">
				<div class="modal-dialog">

				<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" id="close-modal-button">×</button>
							<h4 class="modal-title"></h4>
						</div>
						<div class="modal-body">
							
								
						</div>
						<div class="modal-footer">
								
						</div>
					</div>

				</div>
			</div>
				`;
	    modal.appendChild(contenedorModal);
		let titulo = contenedorModal.querySelector(".modal-title");
		titulo.innerHTML=title;

		let contenido=contenedorModal.querySelector(".modal-body");
		contenido.innerHTML=mensaje;

		let botonCerrar = contenedorModal.querySelector("#close-modal-button");

		botonCerrar.addEventListener("click", () => this.closeModal());

		if(boton=="default"){
			let button1=document.createElement("button");
			button1.innerHTML="Aceptar"
			button1.className = "btn btn-warning";
			button1.addEventListener("click", ()=>this.closeModal());
			let botonDinamico = contenedorModal.querySelector(".modal-footer");
			botonDinamico.appendChild(button1);
		}
		else{
			let botonDinamico = contenedorModal.querySelector(".modal-footer");
			botonDinamico.appendChild(boton);
		}
	};
}
class PaginaMenu extends Pagina{
	constructor(contenedorHtml,navigationControler,url){
		super(contenedorHtml,navigationControler,url);
	}
	pintarNavegacion(){
		let estructura=`
			<nav class="navbar navbar-inverse">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="">Proyecto Javascript</a>
			    </div>
			    <ul class="nav navbar-nav">
			      <li id="home" class="active"><a href="">Home</a></li>
			      <li><a id="page1" href="">Gestion Comidas</a></li>
			      <li><a id="page2" href="">Gestion Bebidas</a></li>
			      <li><a id="page3" href="">Editar Usuario</a></li>
			    </ul>
			    <ul class="nav navbar-nav navbar-right">
			      
			      <li><a id="logout" href=""><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
    			</ul>
			  </div>
		`;
		let container = document.querySelector("body");
		let divNavegacion = document.createElement("header");
		divNavegacion.innerHTML=estructura;
		container.appendChild(divNavegacion);
		for (var i = 0; i < this._navigationControler._pages.length; i++) {	
			if(this._navigationControler._pages[i]._urlPagina!="#login" && this._navigationControler._pages[i]._urlPagina!="#signup"){
				let componente=this._navigationControler._pages[i]._urlPagina;
				let botonHome = this._contenedorHtml.querySelector(componente);
				botonHome.addEventListener("click",(e)=>{
					e.stopPropagation();
					e.preventDefault();
					this._navigationControler.navergarUrl(componente)
					});
			}
		}
		let botonlogin = this._contenedorHtml.querySelector("#logout");
		botonlogin.addEventListener("click",(e)=>{
			e.preventDefault();
			e.stopPropagation();		
			this.Logout()
		});
	}
	Logout(){
		this._navigationControler.navergarUrl("#login");
	}
}
class PaginaLogin extends Pagina{
	constructor(contenedorHtml,navigationControler,url,userControler){
		super(contenedorHtml,navigationControler,url);
		this._userControler=userControler;
		this._estructura="";
	}
	pintar(){
		let estado=false;
		estado=this._userControler.verificarLogin(); 
		if(estado==true){
			this._navigationControler.navergarUrl("#home");
		}
		else{
			this.borrarPagina();
			this.ponerEstructura();
			this.ponerLoader();
		}
	}
	ponerEstructura(){
		this._estructura=`

			<div id="login" class="container">
			<h2>Login Proyecto Javascript</h2>

			<form action="/action_page.php">
			  <div class="imgcontainer">
			    <!--<img src="img_avatar2.png" alt="Avatar" class="avatar">-->
			  </div>

			  	<div class="container">
				    <label><b>Username</b></label>
				    <input id="campousuario"type="text" placeholder="Ingrese Usuario" name="uname" required>

				    <label><b>Password</b></label>
				    <input id="campopassword" type="password" placeholder="Ingrese Password" name="psw" required>
				    <input id="boxrecordar" type="checkbox"> Recordar Ingreso</input>
			   	</div>
			   	<div class="container"> 
			   
				    <button type="button" id="botonlogin">Login</button>
			  	</div>

			  <div class="container" >
			    <button type="button" id="botoncrearcuenta" class="btn-primary">Crear Cuenta</button>
			  </div>
			</form>
			<div id="contenedorModal">
			</div>
			
			</div>
			

		`;
		this._contenedorHtml.innerHTML=this._estructura;
		//botones
		let botoncrearcuenta = this._contenedorHtml.querySelector("#botoncrearcuenta");
		botoncrearcuenta.addEventListener("click",()=>this._navigationControler.navergarUrl("#signup"));

		let botonlogin = this._contenedorHtml.querySelector("#botonlogin");
		botonlogin.addEventListener("click",()=>this.pintarResultadoLogin());
		

	}

	pintarResultadoLogin(){
		let campo = this._contenedorHtml.querySelector("#campousuario");
		this._userControler._usuarioactivo._usuario=campo.value;
		campo = this._contenedorHtml.querySelector("#campopassword");
		this._userControler._usuarioactivo._password=campo.value;
		campo = this._contenedorHtml.querySelector("#boxrecordar");
		this._userControler._usuarioactivo._recodar=campo.checked;  
		if(this._userControler._usuarioactivo._usuario.length > 0 && this._userControler._usuarioactivo._password.length>0){
			this._userControler.realizarLogin(this._userControler._usuarioactivo).then((response)=>{
				if(response._id)
				{
					this._navigationControler.navergarUrl("#home");
				}
				else{
					this.openModal("Verifica","Datos ingresados Incorrecto","default");
				}
			});
		}
		else{
			this.openModal("Verifica","Faltan Datos en el formulario","default");
		}
	}
}
class PaginaSignUp extends Pagina{
	constructor(contenedorHtml,navigationControler,url,userControler){
		super(contenedorHtml,navigationControler,url);
		this._estructura="";
		this._userControler=userControler;
		this._usuario=new Usuario();
	}
	pintar(){
		this.borrarPagina();
		this.ponerEstructura();
	}
	ponerEstructura(){
		this._estructura=`
		<div id="login" class="container">
		<h2>Crear Usuario Proyecto Javascript</h2>
			<form action="/action_page.php">
			  <div class="container">
			    <label><b>Usuario</b></label>
			    	<input id="campousuario" type="text" placeholder="Introduzca su Usuario" name="email" required>
			    <label><b>Nombre</b></label>
			    	<input id="camponombre" type="text" placeholder="Introduzca su Nombre" name="email" required>
			    <label><b>Apellidos</b></label>
			    	<input id="campoapellido" type="text" placeholder="Introduzca su Apellidos" name="email" required>
			    <label><b>Email</b></label>
			    	<input id="campoemail" type="text" placeholder="Introduzca su Email" name="email" required>
			    <label><b>Password</b></label>
			    	<input id="campopassword1" type="password" placeholder="Digite su Password" name="psw" required>
			    <label><b>Repita Password</b></label>
			    	<input id="campopassword2" type="password" placeholder="repita el Password" name="psw-repeat" required>
			    <div class="clearfix">
			    	<button type="button" id="btn-crear" class="signupbtn">Sign Up</button>
			      <button type="button" id="btn-cancelarcrear" class="cancelbtn">Cancel</button>
			      
			    </div>
			    <div id="contenedorModal">
			    </div>
			  </div>
			</form>
		</div>
		`;
		this._contenedorHtml.innerHTML=this._estructura;
		let botoncrearcuenta = this._contenedorHtml.querySelector("#btn-cancelarcrear");
		botoncrearcuenta.addEventListener("click",()=>this._navigationControler.navergarUrl("#login"));
		let botoncrear = this._contenedorHtml.querySelector("#btn-crear");
		botoncrear.addEventListener("click",()=>this.pintarResutadoSingup());

	}
	pintarResutadoSingup(){
		let campo = this._contenedorHtml.querySelector("#campousuario");
		this._usuario._usuario=campo.value;
		campo = this._contenedorHtml.querySelector("#camponombre");
		this._usuario._nombre=campo.value;
		campo = this._contenedorHtml.querySelector("#campoapellido");
		this._usuario._apellido=campo.value;
		campo = this._contenedorHtml.querySelector("#campoemail");
		this._usuario._mail=campo.value;
		campo = this._contenedorHtml.querySelector("#campopassword1");
		let password1=campo.value;
		campo = this._contenedorHtml.querySelector("#campopassword2");
		let passwordConfirmado=campo.value;
		if(this._usuario._usuario.length>0&&this._usuario._nombre.length>0&&this._usuario._apellido.length>0&&this._usuario._mail.length>0){
			if(passwordConfirmado===password1&&passwordConfirmado!=""){
				this._usuario._password=campo.value;
				this._userControler.crearUsuario(this._usuario).then((response)=>{
				let resultado=response;
					if(resultado==11000){
						this.openModal("Error","Usuario Duplicado","default");
					}
					else{

						let button1=document.createElement("button");
						button1.innerHTML="Aceptar"
						button1.className = "btn btn-warning";
						button1.addEventListener("click", ()=>this._navigationControler.navergarUrl("#login"));
						
						this.openModal("Confirmacion","Usuario Creado",button1);
					}
				});
			}
			else{
				this.openModal("Verifica","Los Passwords no conincide","default");
			}
		}
		else{
			this.openModal("Verifica","Faltan Datos en el formulario","default");
		}

	}
}
class PaginaHome extends PaginaMenu{
	constructor(contenedorHtml,navigationControler,url,userControler){
		super(contenedorHtml,navigationControler,url);
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
		<div id="contenido" class="container">
			<p>Home Page</p>
		</div>
		`;
		let container = document.querySelector("body");
		let divContenido = document.createElement("div");
		divContenido.className = "container";
		divContenido.innerHTML=this._estructura;
		this._contenedorHtml.appendChild(divContenido);
		/*let botoncrearcuenta = this._contenedorHtml.querySelector("#btn-cancelarcrear");
		botoncrearcuenta.addEventListener("click",()=>this._navigationControler.navergarUrl("#login"));*/

	}
}
	class PaginaUno extends PaginaMenu{
	constructor(contenedorHtml,navigationControler,url,comidaControler){
		super(contenedorHtml,navigationControler,url);
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
		this._comidaControler.getAllComida().then((response)=>{ 
			this.paintAllComida(this._comidaControler._comidas);
		});

	}
	paintAllComida(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML=null;
		for (let i =0; i<data.length; i++) {
			let comida=data[i];
			let row =this.getRowForSuperHeroe(comida);
			tbody.appendChild(row);	
		}
	}
	getRowForSuperHeroe(comida){
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
		tr.appendChild(td7);

		return tr;
	}
	cargarEditarComida(comida){
		console.log(comida);
	}
	borrarComida(comida){
		console.log(comida);
	}
	ponerEstructura(){
				let estructura =`
			<h3 class="main-title">Gestion de Comida</h3>
			<div class="well">
					<form id="formcomida" class="form-inline">
								<div class="form-group">
								    <label for="email">Nombre</label>
								    <input type="text" class="form-control" id="nombre" size="10">
								</div>

								<div class="form-group">
										<label for="email">Existencias</label>
										<input text="email" class="form-control" id="profesion" size="10">
								</div>
								<button type="button" id="btnCrear" class="btn btn-success">Crear</button>
								<button type="button" id="btnEditar"class="btn btn-success">Editar</button>
								<button type="button" id="btnReset"class="btn btn-info">Reset</button>
					</form>
			</div>
			<div class button-container>	
				<span>   </spand>
			</div>
			<div class="well">
				<table id="tablecomida" class="table table-striped table-bordered">
		    <thead>
		      <tr>
		        <th>Nombre</th>
		        <th>Existencias</th>
		        <th>Acciones</th>
		      </tr>
		    </thead>
		    <tbody>

		    </tbody>
		  </table>
		  </div>
		</div>`;
		let container = document.querySelector("body");
		let divContenido = document.createElement("div");
		divContenido.className = "container";
		divContenido.innerHTML=estructura;
		this._contenedorHtml.appendChild(divContenido);
	}
}
	class PaginaDos extends PaginaMenu{
	constructor(contenedorHtml,navigationControler,url,userControler){
		super(contenedorHtml,navigationControler,url);
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
			<p>PAgina Dos</p>
		</div>
		`;
		let container = document.querySelector("body");
		let divContenido = document.createElement("div");
		divContenido.className = "container";
		divContenido.innerHTML=this._estructura;
		this._contenedorHtml.appendChild(divContenido);
		/*let botoncrearcuenta = this._contenedorHtml.querySelector("#btn-cancelarcrear");
		botoncrearcuenta.addEventListener("click",()=>this._navigationControler.navergarUrl("#login"));*/
	
	}
}
	class PaginaTres extends PaginaMenu{
	constructor(contenedorHtml,navigationControler,url,userControler){
		super(contenedorHtml,navigationControler,url);
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
			<form id="Formeditar" action="/action_page.php">
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
			    		<button type="button" id="btn-editar" class="btn-warning">Editar Usuario</button>
			    	</div>
			    	<div class="col-sm-4">
			    		<button type="button" id="btn-guardar" class="signupbtn">Guardar Edicion</button>
			    	</div>
			    	<div class="col-sm-4">
			    		<button type="button" id="btn-eliminar" class="signupbtn">Borrar Usuario</button>
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
		let botoneditar = this._contenedorHtml.querySelector("#btn-editar");
		botoneditar.addEventListener("click",()=>this.pintarEditar("false")); 
		let botonguardar = this._contenedorHtml.querySelector("#btn-guardar");
		botonguardar.addEventListener("click",()=>this.pintarGuardar()); 
		let botoneliminar = this._contenedorHtml.querySelector("#btn-eliminar");
		botoneliminar.addEventListener("click",()=>this.pintarBorrar()); 
	}
	pintarEditar(estado)
	{
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
		}
	}
	pintarGuardar(){
		this.pintarEditar("true");
		let campo = this._contenedorHtml.querySelector("#editarusuario");
		this._userControler._usuarioactivo._usuario=campo.value;
		campo = this._contenedorHtml.querySelector("#editarnombre");
		this._userControler._usuarioactivo._nombre=campo.value;
		campo = this._contenedorHtml.querySelector("#editarapellido");
		this._userControler._usuarioactivo._apellido=campo.value;
		campo = this._contenedorHtml.querySelector("#editaremail");
		this._userControler._usuarioactivo._mail=campo.value;
		if(this._userControler._usuarioactivo._usuario.length>0&&this._userControler._usuarioactivo._nombre.length>0&&this._userControler._usuarioactivo._apellido.length>0&&this._userControler._usuarioactivo._mail.length>0){
			this._userControler.editarUsuario(this._userControler._usuarioactivo).then((response)=>{ 
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
		this._userControler.borrarUsuario(this._userControler._usuarioactivo).then((response)=>{ 
			if(response.message=="User borrado"){
				let button1=document.createElement("button");
				button1.innerHTML="Aceptar"
				button1.className = "btn btn-warning";
				button1.addEventListener("click", ()=>this._navigationControler.navergarUrl("#login"));
				this.openModal("Confirmacion","Usuario Borrado",button1);
			}else{
				this.openModal("Fallo",response.message,"default");
			}
		});			
	}
}