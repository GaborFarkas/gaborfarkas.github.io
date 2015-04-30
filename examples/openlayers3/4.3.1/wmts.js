function wmts() {
    var projection = ol.proj.get('EPSG:3857');
    var projectionExtent = projection.getExtent();
    var size = ol.extent.getWidth(projectionExtent) / 256;
    var matrixIds = [];
    var resolutions = [];
    for (var i=0;i<31;i++) {
        matrixIds.push('EPSG:900913:' + i);
        resolutions.push(size / Math.pow(2, i))
    }
    
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.WMTS({
                    url: 'http://demo.opengeo.org/geoserver/gwc/service/wmts',
                    layer: 'ne:NE1_HR_LC_SR_W_DR',
                    style: null,
                    matrixSet: 'EPSG:900913',
                    format: 'image/png',
                    tileGrid: new ol.tilegrid.WMTS({
                        origin: ol.extent.getTopLeft(projectionExtent),
                        matrixIds: matrixIds,
                        resolutions: resolutions
                    })
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [0,0],
            zoom: 3
        })
    });
}