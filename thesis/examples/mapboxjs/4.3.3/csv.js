function csv() {
    map = new L.mapbox.Map('map', null, {
        center: [0,0],
        zoom: 2,
        crs: L.CRS.EPSG4326
    });
    
    omnivore.csv('../../../res/vector/ne_capitals.csv', {
        latfield: 'lat',
        lonfield: 'lon',
        delimiter: '\t'
    }).addTo(map);
}