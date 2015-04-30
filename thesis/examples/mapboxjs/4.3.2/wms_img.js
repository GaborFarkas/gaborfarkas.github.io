function wms_img() {
    map = new L.mapbox.Map('map', null, {
        center: [0,0],
        zoom: 3,
        crs: L.CRS.EPSG4326,
        layers: [
            L.nonTiledLayer.wms("http://demo.opengeo.org/geoserver/wms", {
            	layers: 'bluemarble',
            	format: 'image/png',
            	transparent: true,
            })
        ]
    });
}