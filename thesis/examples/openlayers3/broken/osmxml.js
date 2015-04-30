function osmxml() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.OSMXML({
                    url: '../../../res/vector/ne_roads.osm',
                    projection: 'EPSG:4326'
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [6,45],
            zoom: 5
        })
    });
    
    function writeRandCoord(){
        var feats = map.getLayers().getArray()[0].getSource().getFeatures();
        if (feats.length > 0) {
            var featNo = Math.floor(Math.random()*feats.length);
            var coords = feats[featNo].getGeometry().getCoordinates()[0];
            document.getElementById('info').innerHTML = 'First coordinates of feature no ' + featNo + ': ' + coords[0] + ', ' + coords[1];
        } else {
            setTimeout(writeRandCoord, 500);
        }
    }
    writeRandCoord();
}