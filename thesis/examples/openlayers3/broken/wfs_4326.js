function wfs4326() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.ServerVector({
                    format: new ol.format.WFS({
                        featureNS: 'http://www.openplans.org/topp',
                        featureType: 'states'
                    }),
                    loader: function(extent, res, proj) {
                        var source = this;
                        var url = 'http://demo.opengeo.org/geoserver/wfs?request=GetFeature&version=1.1.0&typename=topp:states&srsname=' + proj.getCode() + '&bbox=' + extent.join(',');
                        var ajax = new XMLHttpRequest();
                        ajax.open('GET', url);
                        ajax.onreadystatechange = function() {
                            if (ajax.status === 200 && ajax.readyState === 4) {
                                var features = source.addFeatures(source.readFeatures(ajax.responseText));
                                source.addFeatures(features);
                            }
                        };
                        ajax.send();
                    }
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [37, -95],
            zoom: 3
        })
    });
}