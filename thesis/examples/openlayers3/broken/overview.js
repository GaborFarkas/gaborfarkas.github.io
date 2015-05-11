function overview() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        controls: ol.control.defaults().extend([new ol.control.OverviewMap()]),
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [0,0],
            zoom: 3
        })
    });
}