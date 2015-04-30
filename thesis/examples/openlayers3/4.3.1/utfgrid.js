function utfgrid() {
    var utfgridSource = new ol.source.TileUTFGrid({
        url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.json'
    });
    
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Tile({
                source: utfgridSource
            })
        ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [0,0],
            zoom: 3
        })
    });
    var output = document.getElementById("info");
    map.on('pointermove', function(evt) {
        var viewResolution = map.getView().getResolution();
        utfgridSource.forDataAtCoordinateAndResolution(evt.coordinate, viewResolution,
            function(data) {
                if (data) {
                    output.innerHTML = data['admin'];
                }
            });
    });
}