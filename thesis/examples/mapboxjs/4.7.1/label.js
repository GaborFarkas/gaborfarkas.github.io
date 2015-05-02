function label() {
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
                    return L.marker(latlng, {
                        icon: L.divIcon({
                            html: feature.properties.NAME,
                            iconSize: [100, 20],
                            className: 'my-custom-label-class'
                        })
                    })
                }
            }).addTo(map);
        }
    }
    ajax.send();
}