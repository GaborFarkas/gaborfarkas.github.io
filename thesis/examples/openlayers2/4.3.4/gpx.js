function gpx() {
    var layer = map.layers[0];
    var parser = new OpenLayers.Format.GPX();
    document.getElementById('functionOutput').innerHTML = '';
    document.getElementById('functionOutput').appendChild(document.createTextNode(parser.write(layer.features)));
}