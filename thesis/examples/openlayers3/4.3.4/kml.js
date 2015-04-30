function kml() {
    var features = map.getLayers().getArray()[0].getSource().getFeatures();
    var parser = new ol.format.KML();
    document.getElementById('functionOutput').innerHTML = '';
    document.getElementById('functionOutput').appendChild(document.createTextNode(parser.writeFeatures(features)));
}