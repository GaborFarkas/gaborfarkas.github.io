function reproject() {
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:900913',
        layers: [
            new OpenLayers.Layer.WMS(
                'Global Imagery',
                'http://demo.opengeo.org/geoserver/wms',
                {
                    layers: 'bluemarble'
                }, {
                    wrapDateLine: true
                })
        ],
        center: [2202000, 6183200],
        zoom: 4
    });
    
    map.addLayer(new OpenLayers.Layer.Vector('Countries', {
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: '../../../res/vector/ne_roads.geojson',
            format: new OpenLayers.Format.GeoJSON()
        }),
        projection: 'EPSG:4326'
    }));
}