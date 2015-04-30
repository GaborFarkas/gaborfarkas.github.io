function wfs() {
    map = new OpenLayers.Map('map', {
        allOverlays: true,
        projection: 'EPSG:3857',
        layers: [
            new OpenLayers.Layer.Vector('OSM Admin 5678', {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.WFS({
                    url: "http://demo.opengeo.org/geoserver/wfs",
                    featureType: "admin_5678"
                })
            })
        ],
        center: [-8894286.12, 5466964.65],
        zoom: 9
    });
}