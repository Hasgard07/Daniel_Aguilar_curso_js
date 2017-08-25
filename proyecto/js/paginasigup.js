
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
			<form class="sigupuser">
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
			    	<button type="button" id="btn-crear" class="btnsigup signupbtn">Sign Up</button>
			      <button type="button" id="btn-cancelarcrear" class="btnsigup cancelbtn">Cancel</button>
			      
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
		this.openLoader();
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
				this.closeLoader();
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