function init() {
    document.removeEventListener('DOMContentLoaded', init);
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                name: 'OpenStreetMap'
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    format: new ol.format.GeoJSON({
                        defaultDataProjection: 'EPSG:4326'
                    }),
                    url: '../res/world_countries.geojson',
                    attributions: [
                        new ol.Attribution({
                            html: 'World Countries © Natural Earth'
                        })
                    ]
                }),
                name: 'World Countries'
            })
        ],
        controls: [],
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });

    var clippedLayer = new ol.layer.Tile({
        source: new ol.source.MapQuest({
            layer: 'osm'
        }),
        zIndex: 9999
    });
    clippedLayer.on('precompose', function (evt) {
        var ctx = evt.context;
        ctx.save();
        ctx.beginPath();
        ctx.rect(20, 20, 100, 100);
        ctx.clip();
    });
    clippedLayer.on('postcompose', function (evt) {
        evt.context.restore();
    });
    clippedLayer.setMap(map);
    hljs.initHighlightingOnLoad();
}
document.addEventListener('DOMContentLoaded', init);