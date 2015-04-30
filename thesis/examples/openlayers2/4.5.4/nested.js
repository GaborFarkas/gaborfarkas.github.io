function nested() {
    var featArray = [];
    var lyr = map.layers[0];
    var filter = new OpenLayers.Filter.Logical({
        type: '||',
        filters: [
            new OpenLayers.Filter.Spatial({
                type: 'INTERSECTS',
                value: poly
            }),
            new OpenLayers.Filter.Comparison({
                type: '==',
                property: 'name',
                value: 'Spain'
            })
        ]
    })
    for (var i=0;i<lyr.features.length;i++) {
        var feat = lyr.features[i];
        if (filter.evaluate(feat)) {
            featArray.push(feat);
        }
    }
    return featArray;
}