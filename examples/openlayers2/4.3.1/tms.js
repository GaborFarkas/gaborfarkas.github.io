function tms() {
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:3857',
        layers: [
            new OpenLayers.Layer.TMS('TMS',
                "http://demo.opengeo.org/geoserver/gwc/service/tms/", {
                    layername: 'nasa:bluemarble@EPSG:900913@png', 
                    type:'png'
                })
        ],
        center: [0,0],
        zoom: 3
    });
}