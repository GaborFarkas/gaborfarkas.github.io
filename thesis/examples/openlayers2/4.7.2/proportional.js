function proportional() {
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
                styleMap: new OpenLayers.StyleMap(
                    new OpenLayers.Style({
                        fillColor: '#ffffff',
                        strokeColor: '#000000'
                        },{
                        rules: [
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '>',
                                    property: 'POP_MAX',
                                    value: 28540900
                                }),
                                symbolizer: {
                                    pointRadius: 10
                                }
                            }),
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '..',
                                    property: 'POP_MAX',
                                    upperBoundary: 28540900,
                                    lowerBoundary: 21405800
                                }),
                                symbolizer: {
                                    pointRadius: 8
                                }
                            }),
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '..',
                                    property: 'POP_MAX',
                                    upperBoundary: 21405800,
                                    lowerBoundary: 14270700
                                }),
                                symbolizer: {
                                    pointRadius: 6
                                }
                            }),
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '..',
                                    property: 'POP_MAX',
                                    upperBoundary: 14270700,
                                    lowerBoundary: 7135600
                                }),
                                symbolizer: {
                                    pointRadius: 4
                                }
                            }),
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '<',
                                    property: 'POP_MAX',
                                    value: 7135600
                                }),
                                symbolizer: {
                                    pointRadius: 2
                                }
                            })
                        ]
                    })
                )
            })
        ],
        center: [6,45],
        zoom: 5
    });
}