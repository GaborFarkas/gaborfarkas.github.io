function headers() {
    var headers = [];
    for (var i=0;i<lyr.features.length;i++) {
        for (var j in lyr.features[i].attributes) {
            if (headers.indexOf(j) === -1) {
                headers.push(j);
            }
        }
    }
    return headers;
}