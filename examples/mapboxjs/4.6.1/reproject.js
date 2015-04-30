function reproject() {
    map = new L.mapbox.Map('map', null, {
        center: [49,18],
        zoom: 3,
        crs: L.CRS.EPSG3857
    });
    map.featureLayer.loadURL('../../../res/vector/countries_trunk.geojson');
}