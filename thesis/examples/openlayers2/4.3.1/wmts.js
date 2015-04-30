function wmts() {
    var matrixIds = [];
    
    for (var i=0;i<31;i++) {
        matrixIds.push('EPSG:900913:' + i);
    }
    
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:3857',
        layers: [
            new OpenLayers.Layer.WMTS({
                name: 'WMTS',
                url: 'http://demo.opengeo.org/geoserver/gwc/service/wmts',
                layer: 'ne:NE1_HR_LC_SR_W_DR',
                matrixSet: 'EPSG:900913',
                matrixIds: matrixIds,
                format: 'image/png',
                style: null
            })
        ],
        center: [0,0],
        zoom: 3
    });
}