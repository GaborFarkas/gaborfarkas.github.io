function addrmlyr() {
    evt = function(){/*Do something*/};
    map.getLayers().on('add', evt);
    map.getLayers().on('remove', evt);
}