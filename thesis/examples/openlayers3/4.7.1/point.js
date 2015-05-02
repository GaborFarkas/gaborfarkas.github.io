function point() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.StaticVector({
                    format: new ol.format.GeoJSON(),
                    url: '../../../res/vector/ne_capitals.geojson'
                }),
                style: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: '#000000'
                        })
                    })
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