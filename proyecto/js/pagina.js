class Pagina{
	constructor(contenedorHtml,navigationControler,url,titulo){
		this._urlPagina=url;
		this._titulo=titulo;
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
	closeLoader(){
		var modal = document.querySelector("#modal");
		if(modal){
			modal.parentElement.removeChild(modal);
		}
	}
	openLoader(){
		let modal  =  document.querySelector("#contenedorModal");
		let contenedorModal=document.createElement("div");
		contenedorModal.setAttribute("id", "modal");
		contenedorModal.innerHTML = `
			<div class="modal fade in" id="myModal" role="dialog">
				<div class="modal-dialog">
					<div class="loaderajuste modal-content">
						<div class="loader"></div>
					</div>

				</div>
			</div>
				`;
	    modal.appendChild(contenedorModal);
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
	constructor(contenedorHtml,navigationControler,url,titulo){
		super(contenedorHtml,navigationControler,url,titulo);
	}
	pintarNavegacion(){
		let estructura=`
			<nav class="navbar navbar-inverse">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a id="titulobar" class="navbar-brand" href="">Proyecto Javascript</a>
			    </div>
			    <ul id="listaMenu" class="nav navbar-nav">
			      
			    </ul>
			    <ul class="nav navbar-nav navbar-right">
			      
			      <li><a id="logout" href=""><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
    			</ul>
			  </div>
			   <div id="contenedorModal">
		 		</div>
		`;
		let container = document.querySelector("body");
		let divNavegacion = document.createElement("header");
		divNavegacion.innerHTML=estructura;
		container.appendChild(divNavegacion);
		for (var i = 0; i < this._navigationControler._pages.length; i++) {	
			if(this._navigationControler._pages[i]._urlPagina!="#login" && this._navigationControler._pages[i]._urlPagina!="#signup"){
				let componente=this._navigationControler._pages[i]._urlPagina;
				let idcomponente=componente.substr(1);
				let elementoMenu=this._navigationControler._pages[i]._titulo;
				let li = document.createElement("li");
				let a = document.createElement("a");
				a.id = idcomponente;
				a.innerHTML= elementoMenu;
				li.appendChild(a);
				let listaMenu = this._contenedorHtml.querySelector("#listaMenu");
				listaMenu.appendChild(li);
				let botonHome = this._contenedorHtml.querySelector(componente);
				botonHome.addEventListener("click",(e)=>{
					e.stopPropagation();
					e.preventDefault();
					this._navigationControler.navergarUrl(componente)
					});
			}
		}
		let titulobar = this._contenedorHtml.querySelector("#titulobar");
		titulobar.addEventListener("click",(e)=>{ 
			e.preventDefault();
			e.stopPropagation();
			//this._navigationControler.navergarUrl("home");
		});
		let botonlogin = this._contenedorHtml.querySelector("#logout");
		botonlogin.addEventListener("click",(e)=>{
			e.preventDefault();
			e.stopPropagation();		
			this.Logout()
		});
	}
	Logout(){
		localStorage.removeItem("UsuarioLogado");
		this._navigationControler.navergarUrl("#login");
	}
}



class PaginaHome extends PaginaMenu{
	constructor(contenedorHtml,navigationControler,url,comidaControler,titulo,bebidaControler){
		super(contenedorHtml,navigationControler,url,titulo);
		this._comidaControler=comidaControler;
		this._bebidaControler=bebidaControler;
		this._estructura="";
	}
	pintar(){
		this.borrarPagina();
		this.pintarNavegacion();
		this.ponerEstructura();
		this.getAllBebida();
		this.getAllComida();

	}
	getAllComida(){
		let postre=0;
		let principal=0;
		let entrante=0;
		let comidas=[];
		this.openLoader();
		this._comidaControler.getAllComida().then((response)=>{ 
			for (var i = 0; i < response.length; i++) {
				if(response[i]._tipo=="Entrante"){
					entrante=entrante+response[i]._existencias;
				}
				if(response[i]._tipo=="Principal"){
					principal=principal+response[i]._existencias;
				}
				if(response[i]._tipo=="Postre"){
					postre=postre+response[i]._existencias;			
				}
				
			}
			comidas.push(entrante);
			comidas.push(principal);
			comidas.push(postre);
			this.closeLoader();
			this.pintarGraficoComida(comidas);
		});

	}
	getAllBebida(){
		this.openLoader();
		let alcohol=0;
		let sinAlcohol=0;
		let bebidas=[];
		this._bebidaControler.getAllBebidas().then((response)=>{ 
			for (var i = 0; i < response.length; i++) {
				if(response[i]._esAlcoholica==true)
				{
					alcohol=alcohol+response[i]._existencias;
				}else{
					sinAlcohol=sinAlcohol+response[i]._existencias;
				}
			}
			bebidas.push(alcohol);
			bebidas.push(sinAlcohol);
			this.closeLoader();
			this.pintarGraficoBebida(bebidas);
		});

	}
	pintarGraficoBebida(bebidas){

			Highcharts.chart('containerbebida', {
		    chart: {
		        type: 'bar'
		    },
		    title: {
		        text: 'Grafico por clasificacion Bebidas'
		    },
		    subtitle: {
		        text: 'Source: Curso Javascript Francisco Linde'
		    },
		    xAxis: {
		        categories: ['Alholicas', 'No Alholicas'],
		        title: {
		            text: null
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'En unidades',
		            align: 'high'
		        },
		        labels: {
		            overflow: 'justify'
		        }
		    },
		    tooltip: {
		        valueSuffix: ' millions'
		    },
		    plotOptions: {
		        bar: {
		            dataLabels: {
		                enabled: true
		            }
		        }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'top',
		        x: -40,
		        y: 80,
		        floating: true,
		        borderWidth: 1,
		        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		        shadow: true
		    },
		    credits: {
		        enabled: false
		    },
		    series: [{
		        name: 'Cantidad',
		        data: [bebidas[0], bebidas[1]]
		    }]
		});
	}
	pintarGraficoComida(comidas){
			Highcharts.chart('containercomida', {
		    chart: {
		        type: 'bar'
		    },
		    title: {
		        text: 'Grafico Comida por Clasificacion'
		    },
		    subtitle: {
		        text: 'Source: Curso Javascript Francisco Linde'
		    },
		    xAxis: {
		        categories: ['Entrante', 'Principal', 'Postre'],
		        title: {
		            text: null
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'En Unidades',
		            align: 'high'
		        },
		        labels: {
		            overflow: 'justify'
		        }
		    },
		    tooltip: {
		        valueSuffix: ' millions'
		    },
		    plotOptions: {
		        bar: {
		            dataLabels: {
		                enabled: true
		            }
		        }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'top',
		        x: -40,
		        y: 80,
		        floating: true,
		        borderWidth: 1,
		        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		        shadow: true
		    },
		    credits: {
		        enabled: false
		    },
		    series: [ {
		        name: 'Cantidad',
		        data: [comidas[0], comidas[1], comidas[2]]
		    }]
		});
	}

	ponerEstructura(){

		this._estructura=`
		<div id="contenido" class="container">
			<div class="row" id="datosbebida">
  				<div class="col-sm-6">
					<div id="containercomida" style="min-width: 310px; max-width: 800px; height: 400px; margin: 0 auto"></div>
				</div>
				<div class="col-sm-6">
					<div id="containerbebida" style="min-width: 310px; max-width: 800px; height: 400px; margin: 0 auto"></div>
				</div>
			</div>
		</div>
		`;
		let container = document.querySelector("body");
		let divContenido = document.createElement("div");
		divContenido.className = "container";
		divContenido.innerHTML=this._estructura;
		this._contenedorHtml.appendChild(divContenido);

	}
}

