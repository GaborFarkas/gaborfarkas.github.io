function order() {
    evt = function() {/*Do something*/};
    map.getLayers().on('changeorder', evt);
    map.getLayers().dispatchEvent('changeorder');
}