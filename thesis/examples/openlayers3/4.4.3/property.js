function property() {
    evt = function(e) {
        if (e.key === 'myprop') {
            /*Do something*/
        }
    };
    lyr.on('propertychange', evt);
}