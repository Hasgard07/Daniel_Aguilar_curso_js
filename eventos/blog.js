window.onload=function(){
	var header=document.querySelector('header');
	header.addEventListener('click', function(e) {
		console.log('Has clickado en header '+e.target.nodeName)
		});
	var header=document.querySelector('h1');
	header.addEventListener('click', function(e) {
		console.log('Has clickado en H1 '+e.target.nodeName)
		});
	var header=document.querySelector('h2');
	header.addEventListener('click', function(e) {
		console.log('Has clickado en H2 '+e.target.nodeName)
		event.stopPropagation();
		});

	var header=document.querySelector('a');
	header.addEventListener('click', function(e) {
		event.preventDefault();
		console.log('Noticias '+e.target.nodeName)
		event.stopPropagation();
		});
}