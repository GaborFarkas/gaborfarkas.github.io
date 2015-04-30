function attribute() {
    var featArray = [];
    var filter = new OpenLayers.Filter.Comparison({
        type: '==',
        property: 'name',
        value: 'Hungary'
    });
    for (var i=0;i<lyr.features.length;i++) {
        var feat = lyr.features[i];
        if (filter.evaluate(feat)) {
            featArray.push(feat);
        }
    }
    return featArray;
}