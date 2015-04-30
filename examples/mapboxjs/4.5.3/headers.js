function headers() {
    var headers = [];
    map.featureLayer.eachLayer(function(layer) {
        for (var i in layer.feature.properties) {
            if (headers.indexOf(i) === -1) {
                headers.push(i);
            }
        }
    });
    return headers;
}