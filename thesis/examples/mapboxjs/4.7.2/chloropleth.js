function chloropleth() {
    map = new L.mapbox.Map('map', null, {
        center: [45,6],
        zoom: 5,
        crs: L.CRS.EPSG4326
    });
    map.featureLayer.loadURL('../../../res/vector/countries_trunk.geojson');
    map.featureLayer.on('layeradd', function(evt) {
        var prop = evt.layer.feature.properties;
        var color = prop['pop_est'] > 112094336 ? '#bd0026' :
            prop['pop_est'] > 84147425 ? '#f03b20' :
            prop['pop_est'] > 56200515 ? '#fd8d3c' :
            prop['pop_est'] > 28253604 ? '#fecc5c' : '#ffffb2';
        evt.layer.setStyle({
            fillColor: color,
            color: '#000000',
            fillOpacity: 1
        })
    });
}