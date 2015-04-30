function attrtable() {
    lyr.headers = {name: 'string', population: 'int', area: 'float'};
    function getAttributeTable(layer) {
        var attrTable = {};
        for (var i=0;i<layer.features.length;i++) {
            var feature = layer.features[i];
            var tableEntry = attrTable[feature.fid || i] = {};
            for (var j in layer.headers) {
                tableEntry[j] = feature.attributes[j] ? feature.attributes[j] : null;
            }
        }
        return attrTable;
    }
    getAttributeTable(lyr);
}