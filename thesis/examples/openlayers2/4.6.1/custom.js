function custom() {
    Proj4js.defs['EPSG:23700'] = '+proj=somerc +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000 +y_0=200000 +ellps=GRS67 +towgs84=52.17,-71.82,-14.9,0,0,0,0 +units=m +no_defs';
    map = new OpenLayers.Map('map', {
        projection: 'EPSG:23700',
        layers: [
            new OpenLayers.Layer.WMS(
                'Elevation of Hungary',
                'http://www.agt.bme.hu/cgi-bin/mapserv?map=/var/www/html/gis/wms/eu_dem/eu_dem.map',
                {
                    layers: 'mo_eov_szines'
                }, {
                    maxExtent: new OpenLayers.Bounds(400000,45000,950000,380000)
                })
        ],
        center: [720000,180000],
        zoom: 1
    });
}