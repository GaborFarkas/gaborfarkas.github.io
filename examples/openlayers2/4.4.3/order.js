function order() {
    evt = function(e){
        if (e.property === 'order') {
            /*Do something*/
        }
    };
    map.events.on({changelayer: evt});
}