function addrmlyr() {
    evt = function(){/*Do something*/};
    map.on('layeradd', evt);
    map.on('layerremove', evt);
}