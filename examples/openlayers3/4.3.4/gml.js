function gml() {
    var features = map.getLayers().getArray()[0].getSource().getFeatures();
    var parser = new ol.format.GML({
        featureType: 'hunroads',
        featureNS: 'www.naturalearthdata.com'
    });
    document.getElementById('functionOutput').innerHTML = '';
    document.getElementById('functionOutput').appendChild(document.createTextNode(parser.writeFeatures(features)));
}