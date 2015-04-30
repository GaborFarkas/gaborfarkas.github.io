function tms() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    //Original code by Ian McIntosh (https://groups.google.com/forum/#!msg/ol3-dev/8Co4JhwioGQ/nkTcljlUsDsJ)
                    tileUrlFunction: function(coordinate) {
                        var z = coordinate[0];
                        var x = coordinate[1];
                        var y = (1 << z) - coordinate[2] - 1;
                        return 'http://demo.opengeo.org/geoserver/gwc/service/tms/1.0.0/nasa:bluemarble@EPSG:900913@png/'+z+'/'+x+'/'+y+'.png';
                    }
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