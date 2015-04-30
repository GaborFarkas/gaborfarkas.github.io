function loadevt() {
    evt = function(){/*Do something*/};
    tile.on('loading', evt);
    tile.on('load', evt);
}