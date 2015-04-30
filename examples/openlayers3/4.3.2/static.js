function static() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Image({
                source: new ol.source.ImageStatic({
                    url: '../../../res/image/4_m_citylights_lg.gif',
                    imageExtent: [-180, -89.5, 180, 89.5],
                    imageSize: [580, 288]
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