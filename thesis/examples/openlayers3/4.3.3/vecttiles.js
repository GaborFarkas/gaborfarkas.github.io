function vecttiles() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.TileVector({
                    format: new ol.format.TopoJSON(),
                    projection: 'EPSG:3857',
                    url: 'http://{a-c}.tile.openstreetmap.us/vectiles-land-usages/{z}/{x}/{y}.topojson',
                    tileGrid: new ol.tilegrid.XYZ({
                        maxZoom: 19
                    })
                }),
            })
        ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [-8858590, 5473729.3],
            zoom: 12,
            maxZoom: 19
        })
    });
}