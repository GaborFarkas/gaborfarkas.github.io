function point() {
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
                style: {
                    fillColor: '#ffffff',
                    strokeColor: '#000000',
                    pointRadius: 5
                }
            })
        ],
        center: [6,45],
        zoom: 5
    });
}