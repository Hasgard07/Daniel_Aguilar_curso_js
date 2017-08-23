class Navigationcontroller{
	constructor(){
		this._pages=[];
	}
	adicionarpagina(nueavaPagina){
		this._pages.push(nueavaPagina);
	}
	navergarUrl(url){
		for (let i = 0; i < this._pages.length; i++) {
			if(this._pages[i]._urlPagina==url){
				this._pages[i].pintar();
				
			}
		}
	}

}