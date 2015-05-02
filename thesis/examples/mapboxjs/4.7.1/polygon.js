function polygon() {
    map = new L.mapbox.Map('map', null, {
        center: [45,6],
        zoom: 5,
        crs: L.CRS.EPSG4326
    });
    map.featureLayer.loadURL('../../../res/vector/countries_trunk.geojson');
    map.featureLayer.on('layeradd', function(evt) {
        evt.layer.setStyle({
            fillColor: '#ffffff',
            color: '#000000'
        })
    });
}