function length() {
    L.Path.prototype.getLength = function() {
        var coordArr = this.getLatLngs() || [];
        if (coordArr.length > 1) {
            var length = 0;
            if (this instanceof L.Polygon) {
                coordArr.push(coordArr[0]);
            }
            for (var i=1;i<coordArr.length;i++) {
                length += Math.sqrt(Math.pow(coordArr[i-1].lng - coordArr[i].lng,2) + Math.pow(coordArr[i-1].lat - coordArr[i].lat,2));
            }
            return length;
        } else {
            return 0;
        }
    };
    return feat.getLength();
}