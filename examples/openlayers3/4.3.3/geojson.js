function geojson() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.GeoJSON({
                    url: '../../../res/vector/ne_roads.geojson'
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [6,45],
            zoom: 5
        })
    });
}