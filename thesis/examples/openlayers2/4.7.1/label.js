function label() {
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
                        label: "${NAME}"
                    })
                )
            })
        ],
        center: [6,45],
        zoom: 5
    });
}