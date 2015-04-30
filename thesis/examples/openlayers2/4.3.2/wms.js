function wms() {
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:4326',
        layers: [
            new OpenLayers.Layer.WMS(
                'Global Imagery',
                'http://demo.opengeo.org/geoserver/wms',
                {
                    layers: 'bluemarble'
                })
        ],
        center: [0,0],
        zoom: 3
    });
}