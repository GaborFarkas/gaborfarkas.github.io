function chloropleth() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Vector({
                source: new ol.source.StaticVector({
                    format: new ol.format.GeoJSON(),
                    url: '../../../res/vector/countries_trunk.geojson'
                }),
                style: function(feat, res) {
                    var prop = feat.get('pop_est');
                    var color = prop > 112094336 ? '#bd0026' :
                        prop > 84147425 ? '#f03b20' :
                        prop > 56200515 ? '#fd8d3c' :
                        prop > 28253604 ? '#fecc5c' : '#ffffb2';
                    return [new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#000000'
                        }),
                        fill: new ol.style.Fill({
                            color: color
                        })
                    })];
                }
            })
        ],
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [6,45],
            zoom: 5
        })
    });
}