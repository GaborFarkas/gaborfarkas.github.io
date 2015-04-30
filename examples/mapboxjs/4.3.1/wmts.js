function wmts() {
    var matrixIds = [];
    
    for (var i=0;i<31;i++) {
        matrixIds.push({identifier: 'EPSG:900913:' + i, topLeftCorner: new L.LatLng(20037508.3427,-20037508.3428)});
    }
    map = new L.mapbox.Map('map', null, {
        center: [0,0],
        zoom: 3,
        layers: [
            new L.TileLayer.WMTS("http://demo.opengeo.org/geoserver/gwc/service/wmts", {
                layer: 'ne:NE1_HR_LC_SR_W_DR',
                tilematrixSet: 'EPSG:900913',
                format: 'image/png',
                matrixIds: matrixIds
            })
        ]
    });
}