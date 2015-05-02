function heatmap() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Heatmap({
                source: new ol.source.StaticVector({
                    format: new ol.format.GeoJSON(),
                    url: '../../../res/vector/ne_capitals.geojson'
                }),
                weight: 'weight',
                radius: 20
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [6,45],
            zoom: 5
        })
    });
    var source = map.getLayers().getArray()[0].getSource();
    source.once('change', function(){
        var total = 0;
        for (var i=0;i<source.getFeatures().length;i++) {
            total = total + source.getFeatures()[i].get('POP_MAX');
        }
        for (var i=0;i<source.getFeatures().length;i++) {
            var prop = source.getFeatures()[i].get('POP_MAX');
            source.getFeatures()[i].setProperties({weight: prop/total});
        }
    });
}