function reproject() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.GeoJSON({
                    url: '../../../res/vector/countries_trunk.geojson',
                    defaultprojection: 'EPSG:4326',
                    projection: 'EPSG:3857'
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [2202000, 6183200],
            zoom: 4
        })
    });
}