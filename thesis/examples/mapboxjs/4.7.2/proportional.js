function proportional() {
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
                    var prop = feature.properties;
                    return L.circleMarker(latlng, {
                        fillColor: '#ffffff',
                        radius: prop['POP_MAX'] > 28540900 ? 10 :
                            prop['POP_MAX'] > 21405800 ? 8 :
                            prop['POP_MAX'] > 14270700 ? 6 :
                            prop['POP_MAX'] > 7135600 ? 4 : 2,
                        color: '#000000'
                    })
                }
            }).addTo(map);
        }
    }
    ajax.send();
}