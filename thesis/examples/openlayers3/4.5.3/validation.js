function validation() {
    lyr.getSource().headers = {name: 'string', population: 'int', area: 'float'};
    function setValidatedAttributes(source, feature, attributesObject) {
        for (var i in attributesObject) {
            if (source.headers[i] === 'int') {
                attributesObject[i] = parseInt(attributesObject[i], 10);
            } else if (source.headers[i] === 'float') {
                attributesObject[i] = parseFloat(attributesObject[i]);
            } else {
                attributesObject[i] = String(attributesObject[i]);
            }
            feature.setProperties(attributesObject);
        }
    }
    setValidatedAttributes(lyr.getSource(), feat, {population: 500000});
}