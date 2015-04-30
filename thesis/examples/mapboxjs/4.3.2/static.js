function static() {
    map = new L.mapbox.Map('map', null, {
        center: [0,0],
        zoom: 3,
        crs: L.CRS.EPSG4326,
        layers: [
            L.imageOverlay('../../../res/image/4_m_citylights_lg.gif',
                [[-89.5, -180], [89.5, 180]])
        ]
    });
}