function static() {
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:4326',
        layers: [
            new OpenLayers.Layer.Image(
                'City Lights',
                '../../../res/image/4_m_citylights_lg.gif',
                new OpenLayers.Bounds(-180, -88.759, 180, 88.759),
                new OpenLayers.Size(580, 288)
            )
        ],
        center: [0,0],
        zoom: 3
    });
}