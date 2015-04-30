function length() {
    ol.geom.Polygon.prototype.getLength = function() {
        var coordArr = this.getCoordinates()[0];
        if (coordArr.length > 1) {
            var length = 0;
            for (var i=1;i<coordArr.length;i++) {
                length += Math.sqrt(Math.pow(coordArr[i-1][0] - coordArr[i][0],2) + Math.pow(coordArr[i-1][1] - coordArr[i][1],2));
            }
            return length;
        } else {
            return 0;
        }
    }
    var geom = lyr.getSource().getFeatures()[0].getGeometry();
    return geom.getLength();
}