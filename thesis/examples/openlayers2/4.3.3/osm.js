function osm() {
    map = new OpenLayers.Map('map', {
        allOverlays: true,
        projection: 'EPSG:4326',
        layers: [
            new OpenLayers.Layer.Vector('Natural Earth roads', {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: '../../../res/vector/ne_roads.osm',
                    format: new OpenLayers.Format.OSM()
                })
            })
        ],
        center: [6,45],
        zoom: 5
    });
}