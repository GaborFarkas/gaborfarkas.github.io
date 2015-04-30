function kml() {
    map = new L.mapbox.Map('map', null, {
        center: [45,6],
        zoom: 5,
        crs: L.CRS.EPSG4326
    });
    
    omnivore.kml('../../../res/vector/ne_roads.kml').addTo(map);
}