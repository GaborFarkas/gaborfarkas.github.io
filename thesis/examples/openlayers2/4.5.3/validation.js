function validation() {
    lyr.headers = {name: 'string', population: 'int', area: 'float'};
    function setValidatedAttributes(feature, attributesObject) {
        for (var i in attributesObject) {
            if (feature.layer.headers[i] === 'int') {
                var attribute = parseInt(attributesObject[i], 10);
            } else if (feature.layer.headers[i] === 'float') {
                var attribute = parseFloat(attributesObject[i]);
            } else {
                var attribute = String(attributesObject[i]);
            }
            feature.attributes[i] = attribute;
        }
    }
    setValidatedAttributes(feat, {population: 500000});
}