function tilejson() {
    var TileJSON = function(url) {
        ajax = new XMLHttpRequest();
        ajax.open('GET', url);
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4 && ajax.status === 200) {
                var tileObj = JSON.parse(ajax.responseText);
                var tileName = tileObj.name || 'TileJSON layer';
                for (var i=0;i<tileObj.tiles.length;i++) {
                    tileObj.tiles[i] = tileObj.tiles[i].replace(/{/g, '${');
                }
                if (tileObj.scheme === 'xyz') {
                    var XYZ = new OpenLayers.Layer.XYZ(tileName, tileObj.tiles, {
                        attribution: tileObj.attribution
                    });
                    map.addLayer(XYZ);
                    var maxZoom = tileObj.maxzoom || 31;
                    var minZoom = tileObj.minzoom || 0;
                    XYZ.maxResolution = map.getResolutionForZoom(parseInt(minZoom));
                    XYZ.numZoomLevels = maxZoom - minZoom + 1;
                    map.zoomToMaxExtent();
                } else {
                    throw new Error('No valid XYZ tilesource provided.');
                }
            }
        }
        ajax.send();
    };
    
    TileJSON('https://api.tiles.mapbox.com/v3/mapbox.geography-class.json');
    
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:3857',
        center: [0,0],
        zoom: 3
    });
}