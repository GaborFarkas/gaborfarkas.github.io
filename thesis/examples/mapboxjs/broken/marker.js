function marker() {
    map = new L.mapbox.Map('map', null, {
        center: [45,6],
        zoom: 5,
        crs: L.CRS.EPSG4326
    });
    map.featureLayer.loadURL('../../../res/vector/ne_capitals.geojson');
}