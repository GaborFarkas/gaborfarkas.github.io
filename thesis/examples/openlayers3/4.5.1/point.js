function point() {
    lyr.getSource().addFeature(new ol.Feature({
        geometry: new ol.geom.Point([0,0])
    }));
}