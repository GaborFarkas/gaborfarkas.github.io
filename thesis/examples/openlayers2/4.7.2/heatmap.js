function heatmap() {
    map = new OpenLayers.Map('map', {
        allOverlays: true,
        projection: 'EPSG:4326',
        layers: [
            new OpenLayers.Layer.Vector('Capitals', {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: '../../../res/vector/ne_capitals.geojson',
                    format: new OpenLayers.Format.GeoJSON()
                }),
                renderers: ['Heatmap']
            })
        ],
        center: [6,45],
        zoom: 5
    });
    map.layers[0].events.on({featuresadded: function() {
        var max = 0;
        for (var i=0;i<map.layers[0].features.length;i++) {
            var prop = map.layers[0].features[i].attributes;
            max = max < prop['POP_MAX'] ? prop['POP_MAX'] : max;
        }
        map.layers[0].styleMap = new OpenLayers.StyleMap({
            default: new OpenLayers.Style({
                pointRadius: 20,
                weight: '${weight}'
                }, {
                context: {
                    weight: function(feature) {
                        return feature.attributes['POP_MAX']/max;
                    }
                }
            })
        });
    }});
    map.layers[0].refresh();
}