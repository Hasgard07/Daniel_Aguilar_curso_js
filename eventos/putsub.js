 class Pubsub {
    constructor(){
        this._suscriptor = {};
    }

    subscribe(event, callback) {
        if (!this._suscriptor[event]) {
            var suscriptorArray = [callback];
            this._suscriptor[event] = suscriptorArray;
        } else {
            this._suscriptor[event].push(callback);
        }
    }

    publish(event, data) {
        var eventObject = new EventObject(); 
        eventObject.type = event;
        if (data) {
            eventObject.data = data;
        }
        if (this._suscriptor[event]) {
            this._suscriptor[event].forEach(function(callback) {
                callback(eventObject);
            });
        }
    }

}
let evento= new Pubsub();
var=function avanzar(){
    alert("pubsu");
}:;
evento.subscribe();