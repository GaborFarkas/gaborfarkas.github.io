function wms_img() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Image({
                source: new ol.source.ImageWMS({
                    url: 'http://demo.opengeo.org/geoserver/wms',
                    params: {
                        layers: 'bluemarble',
                        format: 'image/png'
                    }
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [0,0],
            zoom: 3
        })
    });
}