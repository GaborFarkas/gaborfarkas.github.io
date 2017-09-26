function init() {
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://demo.geo-solutions.it/geoserver/wms',
                params: {
                    layers: 'black_marble'
                }
            })
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                loader: function (extent, res, proj) {
                    var source = this;
                    var wfsParser = new ol.format.WFS();
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            source.addFeatures(wfsParser.readFeatures(request.responseText));
                        }
                    };
                    request.open('GET', 'http://demo.geo-solutions.it/geoserver/wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=topp:states&VERSION=1.1.0&SRSNAME=' + proj.getCode() + '&BBOX=' + extent.join(','));
                    request.send();
                }
            })
        })
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
    })
});
var map2 = new ol.Map({
    target: 'map2',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://demo.geo-solutions.it/geoserver/wms',
                params: {
                    layers: 'black_marble'
                }
            })
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                loader: function (extent, res, proj) {
                    var source = this;
                    var wfsParser = new ol.format.WFS();
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            var features = wfsParser.readFeatures(request.responseText);
                            for (var i=0;i<features.length;i++) {
                                features[i].getGeometry().applyTransform(function (coords, coords2, stride) {
                                    for (var j=0;j<coords.length;j+=stride) {
                                        var y = coords[j];
                                        var x = coords[j+1];
                                        coords[j] = x;
                                        coords[j+1] = y;
                                    }
                                });
                            }
                            source.addFeatures(features);
                        }
                    };
                    request.open('GET', 'http://demo.geo-solutions.it/geoserver/wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=topp:states&VERSION=1.1.0&SRSNAME=' + proj.getCode() + '&BBOX=' + extent.join(','));
                    request.send();
                }
            })
        })
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326'
    })
});
}
init();
