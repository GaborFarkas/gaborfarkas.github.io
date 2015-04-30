function geojson() {
    var layer = map.layers[0];
    var parser = new OpenLayers.Format.GeoJSON();
    document.getElementById('functionOutput').innerHTML = parser.write(layer.features);
}