class Usuario{
	constructor(idUsuario,nombre,usuario,email,telefono,website){
		this._idUsuario = idUsuario;
		this._nombre = nombre;
		this._usuario = usuario;
		this._email = email;
		this._telefono = telefono;
		this._website = website;
	}
}
class Post{
	constructor(userid,idpost,titulo,comentario){
		this._userId = userid;
		this._idPost = idpost;
		this._titulo = titulo;
		this._comentario = comentario;
	}
}
class Comments{
	constructor(){
		this._userId = userid;
		this._idComments= idcomments;
		this._nombre = nombre;
		this._email = email;
		this._comments = comments;
	}
}
class MainControler{
	constructor(){
		this._container = null;
		this._divUsuario = null;
		this._divPost = null;
		this._divComments = null;
		this._apiClient =new ApiClient();
		this._usarioClient = new UsarioClient(this._apiClient,);
		this._postClient = new PostClient(this._apiClient);
		this._commentsClient = new CommentsClient(this._apiClient);
		this._pantallaUsuario = new PantallaUsuario(this);
		this._pantallaPost= new PantallaPost(this);
		this._pantallComments= new PantallComments(this);
	}
	init(){
		this.pintarEstructura();
		this._pantallaUsuario.init(this._divUsuario,this._usarioClient);
	}
	initPost(user){
		console.log(user)
		this.pintarEstructuraPost();
		this._pantallaPost.init(this._divPost,this._postClient,user);
	}
	initcomments(){

	}
	closeModal(){
		let modal = document.body.querySelector("#contenedorModal");
		if(modal){
			modal.parentElement.removeChild(modal);
		}
	}
	openModal(content, title){
		let contenedorModal = document.createElement("div");
		contenedorModal.id = "contenedorModal";
		contenedorModal.innerHTML = `
			<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
				<div class="modal-dialog" style="width: 95%;">

				<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" id="close-modal-button">×</button>
							<h4 class="modal-title"></h4>
						</div>
						<div class="modal-body">
							
								
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" id="close-modal-button2">Close</button>
						</div>
					</div>

				</div>
			</div>
			<div class="modal-backdrop fade in"></div>
				`;

		let titulo = contenedorModal.querySelector(".modal-title");
		titulo.innerHTML=title;

		let contenido=contenedorModal.querySelector(".modal-body");
		contenido.appendChild(content);

		let botonCerrar = contenedorModal.querySelector("#close-modal-button");
		botonCerrar.addEventListener("click", () => this.closeModal());

		let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
		botonCerrar2.addEventListener("click", () => this.closeModal());


		document.body.appendChild(contenedorModal);

		return contenedorModal;
	};
	pintarEstructura(){
		this._container = document.createElement("div");
		this._container.className = "container";

		this._divUsuario = document.createElement("div");
		this._divUsuario.className = "almacen-usuarios";

		this._container.appendChild(this._divUsuario);
		document.body.appendChild(this._container);
	}
	pintarEstructuraPost(){

		this._container = document.createElement("div");
		this._container.className = "container";

		this._divPost = document.createElement("div");
		this._divPost.className = "almacen-post";

		this._container.appendChild(this._divUsuario);
		document.body.appendChild(this._container);

	}

}
class PantallaUsuario{
	constructor(mainControler){
		this._contenedorHtml=null;
		this._usuarios=[];
		this._usarioClient=null;
		this._mainControler=mainControler;
	}
	init(contenedorHtml,usarioClient){
		this._contenedorHtml=contenedorHtml;
		this._usarioClient=usarioClient;
		this.pintarEstructura();
		this.getAllUsersAndpaint();
	}
	getAllUsersAndpaint(){
		this.pintarEstructura();
		this._usarioClient.getAllUsuarios().then((data)=>{
		this.paintAllUsuarios(data);
		});
	}
	paintAllUsuarios(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML=null;
		for (let i =0; i<data.length; i++) {
			let usuario=data[i];
			let row =this.getRowForUsuario(usuario);
			tbody.appendChild(row);	
		}
	}
	getRowForUsuario(user){
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML=user._idUsuario;
		tr.appendChild(td1);

		
		let td2 = document.createElement("td");
		//definicion link evento
		let link = document.createElement("a");
		link.innerHTML=user._nombre;
		link.className = "link-post";
		link.addEventListener("click", ()=> this._mainControler.initPost(user));
		//
		td2.appendChild(link);
		tr.appendChild(td2);


		let td3= document.createElement("td");
		td3.innerHTML=user._usuario;
		tr.appendChild(td3);
	
		let td4 = document.createElement("td");
		td4.innerHTML=user._email;
		tr.appendChild(td4);

		
		let td5 = document.createElement("td");
		td5.innerHTML=user._telefono;
		tr.appendChild(td5);

		
		let td6 = document.createElement("td");
		td6.innerHTML=user._website;
		tr.appendChild(td6);

		/*this._divPost = document.createElement("div");
		this._divPost.className = "almacen-post";
		tr.appendChild(this._divPost);*/
	

		return tr;
	}
	pintarEstructura(){
		let estructura =`
			<h1 class="main-title">Listador de Usuarios</h1>
		<div class="well">
			<table class="table table-striped table-bordered">
	    		<thead>
	      			<tr>
				        <th>ID</th>
				        <th>Nombre</th>
				        <th>Usuario</th>
				        <th>Email</th>
				        <th>Telefono</th>
				        <th>Sitio WEB</th>
	     			</tr>
		   		</thead>
		   		<tbody>

		   		</tbody>
		  	</table>
	  	</div>

		`;
		this._contenedorHtml.innerHTML=estructura;
	}
	
}

class PantallaPost{
	constructor(mainControler){
		this._contenedorHtml=null;
		this._post=[];
		this._postClient;
		this._mainControler=mainControler;
	}

	init(contenedorHtml,usarioPost,user){
		this._contenedorHtml=contenedorHtml;
		this._postClient=usarioPost;
		let divtable=document.createElement("div");
		let table=`
			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>ID</th>
						<th>Titulo</th>
						<th>Mensaje</th>
					</tr>
				</thead>
				<tbody class="posttable">
				</tbody>
			</table>
		`;
		divtable.innerHTML=table;
		this._contenedorHtml=divtable;
		this._mainControler.openModal(divtable,"Post cliente");
		this.getAllPostUsersAndpaint(user._idUsuario);
	}

	getAllPostUsersAndpaint(user){

		this._postClient.getAllPost(user).then((data)=>{
		this.paintAllPostUsuario(data);
		});
	}
	paintAllPostUsuario(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector(".posttable");
		tbody.innerHTML=null;
		for (let i =0; i<data.length; i++) {
			let post=data[i];
			let row =this.getRowForPost(post);
			tbody.appendChild(row);	
		}
	};
	getRowForPost(post){
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		td1.innerHTML=post._idPost;
		tr.appendChild(td1);

		
		let td2 = document.createElement("td");
		//definicion link evento
		let link = document.createElement("a");
		link.innerHTML=post._titulo;
		link.className = "link-post";
		link.addEventListener("click", ()=> this._mainControler.initPost(post));
		//
		td2.appendChild(link);
		tr.appendChild(td2);


		let td3= document.createElement("td");
		td3.innerHTML=post._comentario;
		tr.appendChild(td3);

		return tr;
	}

}

class PantallComments{
	constructor(mainControler){
		this._contenedorHtml=null;
		this._comments=[];
		this._commentsClient;
		this._mainControler=mainControler;
	}
}
window.onload = () => {
	let mvc = new MainControler();
	mvc.init();	
}