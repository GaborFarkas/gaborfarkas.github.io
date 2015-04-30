function multipart() {
    lyr.getSource().addFeature(new ol.Feature({
        geometry: new ol.geom.MultiPolygon([[[[0,0], [-2,0], [-2,2], [0,0]]], [[[1,1], [2,1], [2,2], [1,1]]]])
    }));
}