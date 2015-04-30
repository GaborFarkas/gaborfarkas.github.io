function area() {
    var geom = lyr.getSource().getFeatures()[0].getGeometry();
    return geom.getArea();
}