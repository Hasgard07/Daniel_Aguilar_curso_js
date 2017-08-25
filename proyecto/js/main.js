class App{
	constructor(){
		this._apiClient=new ApiClient();
		this._containerHtml= document.querySelector("body");
		this._userControler = new UserControler(this._apiClient);
		this._comidaControler = new ComidaControler(this._apiClient);
		this._bebidaControler = new BebidaControler(this._apiClient);
		this._navigationcontroller = new Navigationcontroller();
		this._loginPage = new PaginaLogin(this._containerHtml,this._navigationcontroller,"#login",this._userControler,);
		this._signupPage = new PaginaSignUp(this._containerHtml,this._navigationcontroller,"#signup",this._userControler);
		this._homePage = new PaginaHome(this._containerHtml,this._navigationcontroller,"#home",this._comidaControler,"Home",this._bebidaControler);
		this._unoPage = new PaginaUno(this._containerHtml,this._navigationcontroller,"#page1",this._comidaControler,"Gestion Comidas");
		this._dosPage = new PaginaDos(this._containerHtml,this._navigationcontroller,"#page2",this._bebidaControler,"Gestion Bebidas");
		this._tresPage = new PaginaTres(this._containerHtml,this._navigationcontroller,"#page3",this._userControler,"Editar Usuario");
		this.addPagesToNavCtrl();

	}
	addPagesToNavCtrl(){
		this._navigationcontroller.adicionarpagina(this._loginPage);
		this._navigationcontroller.adicionarpagina(this._signupPage);
		this._navigationcontroller.adicionarpagina(this._homePage);
		this._navigationcontroller.adicionarpagina(this._unoPage);
		this._navigationcontroller.adicionarpagina(this._dosPage);
		this._navigationcontroller.adicionarpagina(this._tresPage);
	}

	init(){
			this._navigationcontroller.navergarUrl("#login");
	}

}
window.onload = () => {
	let app=new App();
	app.init();
}