closeModal(){
	var modal = document.body.querySelector("#contenedorModal");
	if(modal){
		modal.parentElement.removeChild(modal);
	}
}

openModal(){
	let contenedorModal = document.createElement("div");
	contenedorModal.id = "contenedorModal";
	contenedorModal.innerHTML = `
			<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
			<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
			<div class="modal-header">
			<button type="button" class="close" id="close-modal-button">×</button>
			<h4 class="modal-title">Modal Header</h4>
			</div>
			<div class="modal-body">
			<p>Some text in the modal.</p>
			</div>
			<div class="modal-footer">
			<button type="button" class="btn btn-default" id="close-modal-button2">Close</button>
			</div>
			</div>

			</div>
			</div>
			<div class="modal-backdrop fade in"></div>
			`;

	let botonCerrar = contenedorModal.querySelector("#close-modal-button");
	botonCerrar.addEventListener("click", () => this.closeModal());

	let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
	botonCerrar2.addEventListener("click", () => this.closeModal());

	document.body.appendChild(contenedorModal);
};

/*
<div id="datosPost">
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
							   		<tr>
							   			<td>1</td>
							   			<td>2</td>
							   			<td>3</td>
							   			<td>4</td>
							   			<td>5</td>
							   			<td>6</td>
							   			<div id="datosComment">
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
												   		<tr>
												   			<td>1</td>
												   			<td>2</td>
												   			<td>3</td>
												   			<td>4</td>
												   			<td>5</td>
												   			<td>6</td>
												   		</tr>
												   	</tbody>
												</table>
											</div>
								   		</div>
							   		</tr>
							   	</tbody>
							</table>
						</div>
*/