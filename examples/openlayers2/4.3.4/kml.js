function kml() {
    var layer = map.layers[0];
    var parser = new OpenLayers.Format.KML();
    document.getElementById('functionOutput').innerHTML = '';
    document.getElementById('functionOutput').appendChild(document.createTextNode(parser.write(layer.features)));
}