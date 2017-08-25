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

			<form class="loginuser">
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
		this.openLoader();
		let usuario=new Usuario;
		let campo = this._contenedorHtml.querySelector("#campousuario");
		usuario._usuario=campo.value;
		campo = this._contenedorHtml.querySelector("#campopassword");
		usuario._password=campo.value;
		campo = this._contenedorHtml.querySelector("#boxrecordar");
		usuario._recodar=campo.checked;  
		if(usuario._usuario.length > 0 || usuario._password.length>0){
			this._userControler.realizarLogin(usuario,1).then((response)=>{
				this.closeLoader();
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