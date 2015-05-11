function heatmap() {
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
            var latLngs = [];
            var max = 0;
            var geojsonLyr = L.geoJson(geojsonObj);
            geojsonLyr.eachLayer(function(layer) {
                var prop = layer.feature.properties;
                max = max < prop['POP_MAX'] ? prop['POP_MAX'] : max;
            });
            geojsonLyr.eachLayer(function(layer) {
                var latlng = layer.getLatLng();
                var prop = layer.feature.properties;
                latLngs.push([latlng.lat, latlng.lng, prop['POP_MAX']]);
            });
            L.heatLayer(latLngs, {max: max}).addTo(map);
        }
    }
    ajax.send();
}