function csv() {
    map = new OpenLayers.Map('map', {
        allOverlays: true,
        projection: 'EPSG:4326',
        layers: [
            new OpenLayers.Layer.Vector('Natural Earth capitals', {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: '../../../res/vector/ne_capitals.csv',
                    format: new OpenLayers.Format.Text()
                })
            })
        ],
        center: [0,0],
        zoom: 2
    });
}