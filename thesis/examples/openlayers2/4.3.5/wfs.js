function wfs() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'http://demo.opengeo.org/geoserver/wfs?request=GetCapabilities&version=1.1.0');
    ajax.onreadystatechange = function() {
        if (ajax.status === 200 && ajax.readyState === 4) {
            var parser = new OpenLayers.Format.WFSCapabilities();
            capObj = parser.read(ajax.responseText);
            console.log(capObj);
        }
    };
    ajax.send();
}