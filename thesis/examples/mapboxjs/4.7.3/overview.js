function overview() {
    var tileLayer = L.tileLayer.wms("http://demo.opengeo.org/geoserver/wms", {
    	layers: 'ne:ne',
    	format: 'image/png',
    	transparent: true,
    });
    controlObj = new L.Control.MiniMap(tileLayer).addTo(map);
}