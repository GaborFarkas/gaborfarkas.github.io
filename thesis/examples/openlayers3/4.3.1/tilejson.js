function tilejson() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileJSON({
                    url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.json'
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [0,0],
            zoom: 3
        })
    });
}