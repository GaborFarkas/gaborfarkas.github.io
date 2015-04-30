function tilejson() {
    map = new L.mapbox.Map('map', null, {
        center: [0,0],
        zoom: 3,
        layers: [
            L.mapbox.tileLayer("http://api.tiles.mapbox.com/v3/mapbox.geography-class.json")
        ]
    });
}