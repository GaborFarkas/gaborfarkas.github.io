function geojson() {
    var features = map.getLayers().getArray()[0].getSource().getFeatures();
    var parser = new ol.format.GeoJSON();
    document.getElementById('functionOutput').innerHTML = parser.writeFeatures(features);
}