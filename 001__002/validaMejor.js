function validar(numeroDNI){
	var letraDNI="";
	var validaNum="";
	var resultadoValidacion=1;
	resultadoValidacion=verificaDNI(numeroDNI);
	if(resultadoValidacion==1)
	{
		var patron='TRWAGMYFPDXBNJZSQVHLCKE';
		var caracter=patron.split("");
		validaNum=numeroDNI%23;
		letraDNI=caracter[validaNum];
		console.log("letra DNI es: "+letraDNI)
	}
}
function verificaDNI(numeroDNI){
	var tipoDato="";
	var resultado=1;
	var scadena="";
	if(typeof(numeroDNI)!="number"){
		console.log("Su DNI no es numerico por favor Verifique");
		resultado=0;
	}
	if(numeroDNI.toString().length!=8){
		console.log("Su DNI no tiene 8 caracteres numericos");
		resultado=0;
		}
	if(numeroDNI<0)
	{

		console.log("Su DNI nno puede ser Negativo");
		resultado=0;
	}
	return resultado;
}
validar(12345678);
validar("acf");
validar(-12345678);