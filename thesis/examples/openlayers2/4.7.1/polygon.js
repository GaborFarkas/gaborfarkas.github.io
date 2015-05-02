function polygon() {
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
                style: {
                    strokeColor: '#000000',
                    fillColor: '#ffffff'
                }
            })
        ],
        center: [6,45],
        zoom: 5
    });
}