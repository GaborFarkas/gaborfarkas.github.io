function change() {
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:4326',
        layers: [
            new OpenLayers.Layer.WMS(
                'Global Imagery',
                'http://demo.opengeo.org/geoserver/wms',
                {
                    layers: 'bluemarble'
                }, {
                    maxExtent: [-179,-89,179,89]
                })
        ],
        center: [0,0],
        zoom: 3
    });
    
    function changeProj(srs) {
        var oldProj = map.getProjectionObject();
        var newProj = new OpenLayers.Projection(srs);
        map.projection = srs;
        map.units = map.units ? newProj.proj.units : null;
        map.maxExtent = map.maxExtent ? map.maxExtent.transform(oldProj, newProj) : null;
        for (var i=0;i<map.layers.length;i++) {
            if (!( map.layers[i] instanceof OpenLayers.Layer.Vector)) {
                map.layers[i].projection = newProj;
                map.layers[i].units = map.layers[i].units ? newProj.proj.units : null;
                map.layers[i].maxExtent = map.layers[i].maxExtent ? map.layers[i].maxExtent.transform(oldProj, newProj) : null;
                map.layers[i].initResolutions();
            } else {
                map.layers[i].refresh();
            }
        }
        map.setCenter(map.getCenter().transform(oldProj, newProj), map.getZoom(), false, true);
    }
    changeProj('EPSG:900913');
}