function defaultp() {
    map = new L.mapbox.Map('map', null, {
        layers: [
            L.tileLayer.wms("http://demo.opengeo.org/geoserver/wms", {
            layers: 'bluemarble',
            format: 'image/png',
            transparent: true,
            })
        ],
        center: [0,0],
        zoom: 3,
        crs: L.CRS.EPSG4326
    });
}