function headers() {
    var headers = [];
    var features = lyr.getSource().getFeatures();
    for (var i=0;i<features.length;i++) {
        var keys = features[i].getKeys();
        keys.splice(0,1);
        headers = headers.concat(keys.filter(function (member) {
            return headers.indexOf(member) === -1;
        }));
    }
    return headers;
}