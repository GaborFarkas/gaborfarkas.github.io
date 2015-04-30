function xyz() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    urls: [
                        "http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png",
                        "http://otile2.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png",
                        "http://otile3.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png",
                        "http://otile4.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png"
                    ],
                    attributions: [
                        new ol.Attribution({
                            html: "&copy; MapQuest, OpenStreetMap contributors"
                        })
                    ]
                })
            })
        ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [0,0],
            zoom: 3
        })
    });
}