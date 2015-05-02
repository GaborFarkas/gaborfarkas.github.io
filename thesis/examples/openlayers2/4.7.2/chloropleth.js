function chloropleth() {
    map = new OpenLayers.Map('map', {
        allOverlays: true,
        projection: 'EPSG:4326',
        layers: [
            new OpenLayers.Layer.Vector('Countries', {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: '../../../res/vector/countries_trunk.geojson',
                    format: new OpenLayers.Format.GeoJSON()
                }),
                styleMap: new OpenLayers.StyleMap(
                    new OpenLayers.Style({
                        strokeColor: '#000000'
                        },{
                        rules: [
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '>',
                                    property: 'pop_est',
                                    value: 112094336
                                }),
                                symbolizer: {
                                    fillColor: '#bd0026'
                                }
                            }),
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '..',
                                    property: 'pop_est',
                                    upperBoundary: 112094336,
                                    lowerBoundary: 84147425
                                }),
                                symbolizer: {
                                    fillColor: '#f03b20'
                                }
                            }),
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '..',
                                    property: 'pop_est',
                                    upperBoundary: 84147425,
                                    lowerBoundary: 56200515
                                }),
                                symbolizer: {
                                    fillColor: '#fd8d3c'
                                }
                            }),
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '..',
                                    property: 'pop_est',
                                    upperBoundary: 56200515,
                                    lowerBoundary: 28253604
                                }),
                                symbolizer: {
                                    fillColor: '#fecc5c'
                                }
                            }),
                            new OpenLayers.Rule({
                                filter: new OpenLayers.Filter.Comparison({
                                    type: '<',
                                    property: 'pop_est',
                                    value: 28253604
                                }),
                                symbolizer: {
                                    fillColor: '#ffffb2'
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