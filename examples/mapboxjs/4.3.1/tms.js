function tms() {
    map = new L.mapbox.Map('map', null, {
        center: [0,0],
        zoom: 3,
        layers: [
            L.tileLayer("http://demo.opengeo.org/geoserver/gwc/service/tms/1.0.0/nasa:bluemarble@EPSG:900913@png/{z}/{x}/{y}.png", {
                tms: true
            })
        ]
    });
}