function wmts() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'http://demo.opengeo.org/geoserver/gwc/service/wmts?request=GetCapabilities');
    ajax.onreadystatechange = function() {
        if (ajax.status === 200 && ajax.readyState === 4) {
            var parser = new OpenLayers.Format.WMTSCapabilities();
            capObj = parser.read(ajax.responseText);
            console.log(capObj);
        }
    };
    ajax.send();
}