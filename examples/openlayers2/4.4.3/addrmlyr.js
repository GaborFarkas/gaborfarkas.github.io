function addrmlyr() {
    evt = function(){/*Do something*/};
    map.events.on({addlayer: evt});
    map.events.on({removelayer: evt});
}