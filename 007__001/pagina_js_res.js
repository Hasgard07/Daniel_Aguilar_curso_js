function crearElemento(nombre,valoratrib){
	var elementoCreado=null;
	elementoCreado=document.createElement(nombre);
	elementoCreado.setAttribute("class", valoratrib);
	return elementoCreado;
}
function crearElementotexto(nombre,valoratrib,texto){
	var elementoCreado=null;
	elementoCreado=document.createElement(nombre);
	elementoCreado.setAttribute("class", valoratrib);
	elementoCreado.innerHTML=texto;
	return elementoCreado;
}
function crearImg(tipo,nomclass,origen,path){
	var elementoCreado=null;
	elementoCreado=document.createElement(tipo);
	elementoCreado.setAttribute("class",nomclass);
	elementoCreado.setAttribute(origen,path);
	return elementoCreado;
}

function crearHeader(){
	var body = document.querySelector("body");
	var midiv = crearElemento("div","box")
	var mirow = crearElemento("div","row")
	var col1 = crearElemento("div","col-xs-4 col-sm-4 col-lg-4 cabecera1")
	var col2 = crearElemento("div","col-xs-4 col-sm-2 col-lg-2 cabecera2");
	var col3 = crearElemento("div","col-xs-4 col-sm-3 col-lg-3 cabecera3");
	var col4 = crearElemento("div","col-xs-4 col-sm-3 col-lg-3 cabecera4");
	var col41 = crearElemento("div","select");
	//<img style="cursor:pointer;" src="img/expand_arrow.jpg" alt="" onclick="">
	var input=crearImg("input","inputbuscar","type","text")
	input.setAttribute("maxlength","50");
	input.setAttribute("size","25");
	col41.innerHTML="LA - América Latina";
	var imgLogo=crearImg("img","logo","src","img/nvidia_logo.png");
	var arrow=crearImg("img");
	arrow.setAttribute("src", "img/expand_arrow.jpg");
	arrow.setAttribute("style", "cursor:pointer;");
	body.appendChild(midiv);
	midiv.appendChild(mirow);
	mirow.appendChild(col1);
	mirow.appendChild(col2);
	mirow.appendChild(col3);
	col3.appendChild(input);
	mirow.appendChild(col4);
	col4.appendChild(col41);
	col41.appendChild(arrow);
	col1.appendChild(imgLogo);

};
function navegacion(){
	var body = document.querySelector("body");
	var nav = crearElemento("div","nav");
	var row = crearElemento("div","row");
	var col1 = crearElemento("div","col-xs-1 col-sm-1 col-lg-1")
	var col11 = crearElementotexto("div","title","DRIVERS");
	var col2 = crearElemento("div","col-xs-1 col-sm-1 col-lg-1");
	var col21 = crearElementotexto("div","title","PRODUCTOS")
	var col3 = crearElemento("div","col-xs-1 col-sm-1 col-lg-1");
	var col31 = crearElementotexto("div","title","Drivers");
	var col4 = crearElemento("div","col-xs-2 col-sm-2 col-lg-2");
	var col41 = crearElementotexto("div","title","Deep Learning y AI")
	var col5 = crearElemento("div","col-xs-2 col-sm-2 col-lg-2")
	var col51 = crearElementotexto("div","title","COMUNIDADES")
	var col6 = crearElemento("div","col-xs-2 col-sm-2 col-lg-2");
	var col61 = crearElementotexto("div","title","SOPORTE");
	var col7 = crearElemento("div","col-xs-2 col-sm-2 col-lg-2");
	var col71 = crearElementotexto("div","title","ACERCA DE NVIDIA");
	body.appendChild(nav);
	nav.appendChild(row);
	row.appendChild(col1);
	col1.appendChild(col11);
	row.appendChild(col2);
	col2.appendChild(col21);
	row.appendChild(col3);
	col3.appendChild(col31);
	row.appendChild(col4);
	col4.appendChild(col41);
	row.appendChild(col5);
	col5.appendChild(col51);
	row.appendChild(col6);
	col6.appendChild(col61);
	row.appendChild(col7);
	col7.appendChild(col71);
}
function centro(){
	var body = document.querySelector("body");
	var divcentro = crearElemento("div","imgbox");
	var row = crearElemento("div","row");
	var col1 = crearElemento("div","col-xs-12 col-sm-12 col-lg-12");
	var img = crearImg("img","centro","src","img/Volta-NV-WMFG-980x540-LA-A.jpg");
	body.appendChild(divcentro);
	divcentro.appendChild(row);
	row.appendChild(col1);
	col1.appendChild(img);
}
function noticias(){
	var body = document.querySelector("body");
	var bar= crearElemento("div","navnoticias");
	var row = crearElemento("div","row");
	var col1 = crearElemento("div","col-xs-3 col-sm-3 col-lg-3");
	var col11= crearElemento("div","divhnoticias");
	var col2 = crearElemento("div","col-xs-4 col-sm-4 col-lg-4");
	var col21= crearElemento("div","divhnoticias");
	var col3 = crearElemento("div","col-xs-5 col-sm-5 col-lg-5");
	var h2= crearElementotexto("h2","h2noticias","Noticias de NVIDIA:");
	var a= crearElementotexto("a","anoticias","Reciba las últimas noticias de NVIDIA aquí");
	body.appendChild(bar);
	bar.appendChild(row);
	row.appendChild(col1);
	col1.appendChild(col11);
	col11.appendChild(h2);
	row.appendChild(col2);
	col2.appendChild(col21);
	col21.appendChild(a);
	row.appendChild(col3);

}
window.onload=function(){

	crearHeader();
	navegacion();
	centro();
	noticias();
};