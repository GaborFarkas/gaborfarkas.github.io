function proportional() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.StaticVector({
                    format: new ol.format.GeoJSON(),
                    url: '../../../res/vector/ne_capitals.geojson'
                }),
                style: function(feat, res) {
                    var prop = feat.get('POP_MAX');
                    var r = prop > 28540900 ? 10 :
                        prop > 21405800 ? 8 :
                        prop > 14270700 ? 6 :
                        prop > 7135600 ? 4 : 2
                    return [new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: r,
                            stroke: new ol.style.Stroke({
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