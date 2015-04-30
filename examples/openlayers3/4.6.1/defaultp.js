function defaultp() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
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
            center: [24,45],
            zoom: 4
        })
    });
}