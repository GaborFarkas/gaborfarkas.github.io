function xyz() {
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:3857',
        layers: [
            new OpenLayers.Layer.XYZ('MapQuest', [
                "http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"
            ], {
                attribution: "&copy; MapQuest, OpenStreetMap contributors"
            })
        ],
        center: [0,0],
        zoom: 3
    });
}