function property() {
    evt = function(e){
        if (e.property === 'params') {
            /*Do something*/
        }
    };
    map.events.on({changelayer: evt});
}