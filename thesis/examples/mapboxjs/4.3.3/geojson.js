function geojson() {
    map = new L.mapbox.Map('map', null, {
        center: [45,6],
        zoom: 5,
        crs: L.CRS.EPSG4326,
        layers: [
            L.mapbox.featureLayer()
        ]
    });
    map.featureLayer.loadURL('../../../res/vector/ne_roads.geojson');
}