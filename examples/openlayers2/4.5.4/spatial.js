function spatial() {
    var featArray = [];
    var lyr = map.layers[0];
    var filter = new OpenLayers.Filter.Spatial({
        type: 'INTERSECTS',
        value: poly
    });
    for (var i=0;i<lyr.features.length;i++) {
        var feat = lyr.features[i];
        if (filter.evaluate(feat)) {
            featArray.push(feat);
        }
    }
    return featArray;
}