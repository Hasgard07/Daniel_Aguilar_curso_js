class Aleatorios{
	constructor(){

	}
	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

		return numero;
	}

	static nombreAleatorio(){
		let nombres = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
		let indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

		return nombres[indice];
	}
	static especalidadAleatorio(){
		let especialidad = ["Urgencias", "Trauma", "UCI", "Reuma", "Rehabilitacion"];
		let indice = this.generarNumeroAleatorioEntre(0, especialidad.length-1);

		return nombres[indice];
	}
	static edadAleatorio(){
		let anios=Aleatorios.generarNumeroAleatorioEntre(1970,2010);
		let meses=Aleatorios.generarNumeroAleatorioEntre(1,12);
		let dias=Aleatorios.generarNumeroAleatorioEntre(1,30);
		var fecha = new Date(''+anios+'/'+meses+'/'+dias+'');
		return fecha;
	}

}
class Persona{

	constructor(id,fecha){
		this._idPersona=id;
		this._nombres=Aleatorios.nombreAleatorio();
		this._edad=Aleatorios.generarNumeroAleatorioEntre(1,100);
		this._sexo=Aleatorios.generarNumeroAleatorioEntre(0,1);
		this._fechaNacimiento=Aleatorios.edadAleatorio();
	}

}
class Empleado extends Persona{
	constructor(id){
		super(id);
		this._externo=Aleatorios.generarNumeroAleatorioEntre(0,1);
		this._turno=Aleatorios.generarNumeroAleatorioEntre(0,1);
	}
}
class Medico extends Empleado{
	constructor(id,campo){
		super(id);
		this._especialidad=campo;
	}
	realizarDignostico(paciente,historial){
		let diagnostico=Aleatorios.especalidadAleatorio();

	}
}
class Paciente extends Persona{
	constructor(id,idMedico){
		super(id);
		this._estado="internado";
		this._peso=Aleatorios.generarNumeroAleatorioEntre(50,100);;
		this._idMedico=idMedico;
		this._salud=Aleatorios.generarNumeroAleatorioEntre(10,50);
		this._enfermedad="";
	}
}
class Area{
	constructor(especialidad,numeroPacientes){ 
		this._tipo=especialidad;
		this._medicos=[];
		this._pacientes=[];
		this.capacidad=numeroPacientes;
		this.asignarMedicosAreas(10);
	}
	asignarMedicosAreas(numero){
		for(let indiceMedicos=0;indiceMedicos<numero;indiceMedicos++){
			this._medicos.push(fabrica.crearMedico(this._tipo));
		}
	}
	realizarRonda(){
		let pacientes=null;
		for(let indiceMedico=0;indiceMedico<this._medicos.length;indiceMedico++){
			pacientes=this._pacientes.filter(function(paciente)=>{
					 paciente._idMedico==this._medicos[indiceMedico]._idPersona;
				
			});
		this._medicos[indiceMedico].realizarDignostico(pacientes,this._medicos[indiceMedico]._idPersona);
		}

	}
}
class Hospital{
	constructor(nombre, areas){
		this._nombrehospital=nombre;
		this._areas=[];
		this.inicializarHospital(areas,100);
		this.archivoHospital=new ArchivoHistorial();
	}
	inicializarHospital(areas,capacidad){
		for(let idEspecialidad=0;idEspecialidad<areas.length;idEspecialidad++)
		{
			this._areas.push(new Area(areas[idEspecialidad],capacidad));
		}
	}
	recibirPacientes(){
		let areaUbicar=null;
		areaUbicar=this._areas.find(function(elemento){
			return elemento._tipo=="Urgencias";
		});
		let medicoAtiende=this.getMedico(areaUbicar);
		areaUbicar._pacientes.push(fabrica.crearPaciente(medicoAtiende._idPersona));
	}
	getMedico(especialidad){
		let idmedico=0;
		let medicosActivos=especialidad._medicos.length-1;
		let medicoAcargo=Aleatorios.generarNumeroAleatorioEntre(0,medicosActivos);
		let medicoAsignado=especialidad._medicos[medicoAcargo];
		return medicoAsignado;
	}

	iniciarcicloHospital(){
		for(let idEspecialidad=0;idEspecialidad<areas.length;idEspecialidad++)
		{
			this._areas[idEspecialidad].realizarRonda();
		}
	}
}
class ArchivoHistorial{
	constructor(){
		this._historias=[];
	}
	crearHistoria(id){
		historia=new HitoriaClinica(id);
		this._historias.push(historia);
	}
	buscarHistoria(id){
		let historia=null;
		historia=this._historias.find(function(elemento){
			return elemento._idpersona==id;
		});
		return historia;
	}
	insertarRegistroHistoria(id,idmedico,detalle){
		let historia=null;
		let registro=null;
		historia=this.buscarRegistro(id);
		registro= new Regisro(idmedico,detalle);
		historia._registros.push(Regisro);
	}
}
class HitoriaClinica{
	constructor(id){
		this._idpersona=id;
		this._registros=[];
	}
	buscarRegistro(id){

	}
	agregarRegistro(idmedico,detalle){
		registro=new Regisro(idmedico,detalle);
		return registro;
	}
}
class Regisro{
	constructor(id,detalle){
		this._fechaActual=new Date();
		this._anotaicion=detalle;
		this._idMedico=id;
	}

}
class FabricaPersona{
	constructor(){
		this._ultimoid=0;
	}
	crearMedico(especialidad){
		this._ultimoid=this._ultimoid+1;
		let medico=new Medico(this._ultimoid,especialidad);
		return medico;
	}
	crearPaciente(idMedico){
		this._ultimoid=this._ultimoid+1;
		let paciente=new Paciente(this._ultimoid,idMedico);
		return paciente;
	}
}
function busqueda(buscar,indice){
	return buscar==indice
}
let fabrica = new FabricaPersona();
let areas = ["Urgencias", "Trauma", "UCI", "Reuma", "Rehabilitacion"];
let santaclara = new Hospital("Santa Clara", areas);
santaclara.recibirPacientes();
santaclara.iniciarcicloHospital();