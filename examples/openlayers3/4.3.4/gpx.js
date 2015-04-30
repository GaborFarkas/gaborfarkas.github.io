function gpx() {
    var features = map.getLayers().getArray()[0].getSource().getFeatures();
    var parser = new ol.format.GPX();
    document.getElementById('functionOutput').innerHTML = '';
    document.getElementById('functionOutput').appendChild(document.createTextNode(parser.writeFeatures(features)));
}