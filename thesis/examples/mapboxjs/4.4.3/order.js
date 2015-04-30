function order() {
    evt = function() {/*Do something*/};
    map.on('changeorder', evt);
    map.fireEvent('changeorder');
}