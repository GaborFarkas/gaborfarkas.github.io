function label() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.StaticVector({
                    format: new ol.format.GeoJSON(),
                    url: '../../../res/vector/ne_capitals.geojson'
                }),
                style: function(feat, res) {
                    return [new ol.style.Style({
                        text: new ol.style.Text({
                            text: feat.get('NAME'),
                            fill: new ol.style.Fill({
                                color: '#000000'
                            })
                        })
                    })];
                }
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [6,45],
            zoom: 5
        })
    });
}