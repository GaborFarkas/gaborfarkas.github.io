function gml() {
    var layer = map.layers[0];
    var parser = new OpenLayers.Format.GML();
    document.getElementById('functionOutput').innerHTML = '';
    document.getElementById('functionOutput').appendChild(document.createTextNode(parser.write(layer.features)));
}