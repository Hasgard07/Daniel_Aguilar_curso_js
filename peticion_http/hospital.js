var url="https://ironhack-characters.herokuapp.com/characters";
var headers=new Headers();

headers.append("Content-Type","application/json");

let config={
	method: "GET",
	headers: headers 
};
fetch(url,config).then((response)=>{
	console.log("RESPONSE");
	console.log(response);
	return response.json();

}).then((result)=>{
		console.log("DATA");
		console.log(result);
}).catch((error)=>{
	console.log("ERROR")
	console.log(error);
});