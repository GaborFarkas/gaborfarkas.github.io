function point() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', '../../../res/vector/ne_capitals.geojson');
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            var geojsonObj = JSON.parse(ajax.responseText);
            map = new L.mapbox.Map('map', null, {
                center: [45,6],
                zoom: 5,
                crs: L.CRS.EPSG4326
            });
            L.geoJson(geojsonObj, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        fillColor: '#ffffff',
                        radius: 5,
                        color: '#000000'
                    })
                }
            }).addTo(map);
        }
    }
    ajax.send();
}