function attrtable() {
    map.featureLayer.headers = {name: 'string', population: 'int', area: 'float'};
    function getAttributeTable(layer) {
        var attrTable = {};
        layer.eachLayer(function(featureLayer) {
            var tableEntry = attrTable[featureLayer._leaflet_id] = {};
            for (var i in layer.headers) {
                tableEntry[i] = featureLayer.feature.properties[i] ? featureLayer.feature.properties[i] : null;
            }
        });
        return attrTable;
    }
    getAttributeTable(map.featureLayer);
}