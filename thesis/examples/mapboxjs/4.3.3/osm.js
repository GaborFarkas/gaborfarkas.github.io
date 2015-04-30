function osm() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', '../../../res/vector/ne_roads.osm');
    ajax.onreadystatechange = function() {
        if (ajax.status === 200 && ajax.readyState === 4) {
            parser = new DOMParser();
            osmObj = parser.parseFromString(ajax.responseText, 'text/xml');
            map = new L.mapbox.Map('map', null, {
                crs: L.CRS.EPSG4326,
                center: [45,6],
                zoom: 5,
                layers: [
                    new L.OSM.DataLayer(osmObj)
                ]
            });
        }
    };
    ajax.send();
}