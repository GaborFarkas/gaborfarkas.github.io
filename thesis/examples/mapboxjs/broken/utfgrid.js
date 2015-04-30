function utfgrid() {
    map = new L.mapbox.Map('map', null, {
        center: [0,0],
        zoom: 3,
        layers: [
            L.mapbox.tileLayer("http://api.tiles.mapbox.com/v3/mapbox.geography-class.json")
        ]
    });
    
    var gridLyr = L.mapbox.gridLayer("http://api.tiles.mapbox.com/v3/mapbox.geography-class.json").addTo(map);
    L.mapbox.gridControl(gridLyr).addTo(map);
}