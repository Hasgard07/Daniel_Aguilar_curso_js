class ApiClient{
	constructor(){

	}

	get(url, params){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method: "GET",
			headers: headers
		};

		let promise = fetch(url, config).then((response) => {
			return response.json();
		});

		return promise;
	}

	post(url, params){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method: "POST",
			headers: headers
		};

		if(params){
			let json = JSON.stringify(params);
			config.body = json;
		}

		let promise = fetch(url, config).then((response) => {
			if(response.status >=200 || response.status < 300){
				return response.json();
			}
			else{
				return promise.reject(response.text());
			}
			
		});

		return promise;
	}	

	put(url, params){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method: "PUT",
			headers: headers
		};

		if(params){
			let json = JSON.stringify(params);
			config.body = json;
		}

		let promise = fetch(url, config).then((response) => {
			if(response.status >=200 || response.status < 300){
				if(response.type == JSON)
					return response.json();
				else{
					return response.text();
				}
			}
			else{
				return promise.reject(response.text());
			}
		});
		return promise;

	}	

	patch(url, params){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method: "PATCH",
			headers: headers
		};

		let promise = fetch(url, config).then((response) => {
			return response.json();
		});

		return promise;
	}	

	delete(url, params){
		var headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method: "DELETE",
			headers: headers
		};
		
		if(params){
			let json = JSON.stringify(params);
			config.body = json;
		}
		let promise = fetch(url, config).then((response) => {
			if(response.status >=200 || response.status < 300){
					return response.json();
			}
			else{
				return promise.reject(response.text());
			}
		});

		return promise;
	}	


}