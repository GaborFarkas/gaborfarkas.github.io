function init() {
    document.removeEventListener('DOMContentLoaded', init);
    var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: 'EPSG:4326'
            }),
            url: '../res/world_capitals.geojson',
            attributions: [
                new ol.Attribution({
                    html: 'World Capitals © Natural Earth'
                })
            ]
        })
    });
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        }),
        renderer: 'dom'
    });
}
document.addEventListener('DOMContentLoaded', init);