function wms() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'http://demo.opengeo.org/geoserver/wms?request=GetCapabilities');
    ajax.onreadystatechange = function() {
        if (ajax.status === 200 && ajax.readyState === 4) {
            var parser = new ol.format.WMSCapabilities();
            capObj = parser.read(ajax.responseText);
            console.log(capObj);
        }
    };
    ajax.send();
}