function nested() {
    function filterFeature(feature, property, value, operator) {
        var bool = false;
        if (feature.properties[property]) {
            var featProp = feature.properties[property];
            switch (operator) {
                case "==":
                    bool = (featProp == value);
                    break;
                case "<":
                    bool = (featProp < value);
                    break;
                case "<=":
                    bool = (featProp <= value);
                    break;
                case ">":
                    bool = (featProp > value);
                    break;
                case ">=":
                    bool = (featProp >= value);
                    break;
                case "!=":
                    bool = (featProp != value);
                    break;
                default:
                    throw new TypeError("Operator not supported. Valid operators: '==', '!=' '<', '<=', '>', '>='.");
                    break;
            }
        }
        return bool;
    }
    
    var featArray = [];
    map.featureLayer.eachLayer(function(featLayer) {
        if (filterFeature(featLayer.feature, 'name', 'Hungary', '==') || filterFeature(featLayer.feature, 'name', 'Spain', '==')) {
            featArray.push(featLayer.feature);
        }
    });
    return featArray;
}