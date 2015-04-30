function pip() {
    var geom = lyr.getSource().getFeatures()[0].getGeometry();
    geom.intersectsExtent(new ol.geom.Point([0,0]).getExtent());
}