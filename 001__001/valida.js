function validar(numeroDNI){
	var letraDNI="";
	var validaNum="";
	var caracter=['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
	validaNum=numeroDNI%23;
//console.log(validaNum);

	letraDNI=caracter[validaNum];
	console.log("letra DNI es: "+letraDNI)
}
validar(12345678);
